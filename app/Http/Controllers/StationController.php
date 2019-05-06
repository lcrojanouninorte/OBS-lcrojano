<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Station;

use App\Watcher;

use Auth;

use DB;

use Storage;

class StationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $stations = Station::get();
        return response()->success(compact('stations'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user = Auth::user();
        $this->validate($request, [
        //'username' => 'required',
        //'password' => 'required',
        //'city_id' => 'required',
        //'ads_limit' => 'required',
        'minutes' => 'required',
        'start' => 'required',
        'end' => 'required',
        'active'  => 'required'
        ]);

        //check if have file
        DB::transaction(function () use ($request, $user) {
            $station = new Station;

            if($request->has('id')){
                $station =  Station::find($request->input('id'));
             }
            //LesPac exclusive:
            $station->type = $request->input('type');
            $station->current_index = $request->input('current_index');

            

            //$station->id = $request->input('id'); //Verificar;
            $station->username = $request->input('username');
            $station->password = $request->input('password');
            $station->city_id = $request->input('city_id');
            $station->ads_limit = $request->input('ads_limit');
            $station->minutes = $request->input('minutes');
            $station->start = $request->input('start');
            $station->end =  $request->input('end');
            $station->active =  $request->input('active');
            
        
            if($station->save()){
                $destinationPath = "";
                
                if($request->hasFile('file') && $station->type=="LesPac"){
                    $file  = $request->file('file');
                    $fileName = $file->getClientOriginalName();
                    $destinationPath = "/".$request->input('type')."/".$station->id."/".$fileName;
                    $path = Storage::put(
                        $destinationPath,
                        file_get_contents($file->getRealPath())
                    );
                    $station->file_path = $destinationPath;
                    $station->save();
                }

                //watcher exclusive
                if($station->type == "Watcher"){
                    $watcher = new Watcher;
                    $watcher->text = $request->input('text');
                    $watcher->zip_code = $request->input('zip_code');
                    $watcher->action = $request->input('action');
                    $watcher->active = $request->input('active');
                    $watcher->station_id = $request->input('station_id');
                    $watcher->station_ref = $station->id;
                    $watcher->save();
                }
            };


        });
        return response()->success(compact('station'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        //
        
        $user = Auth::user();

        $this->validate($request, [
            //'username' => 'required',
            //'password' => 'required',
            //'city_id' => 'required',
            //'ads_limit' => 'required',
            'minutes' => 'required',
            'start' => 'required',
            'end' => 'required',
            'active'  => 'required'
            ]);

        
        DB::transaction(function () use ($request, $user, $id) {
            $station =  Station::find($id);

            //LesPac exclusive:
            //$station->type = $request->input('type');
            $station->current_index = $request->input('current_index');

            
            
            $station->username = $request->input('username');
            $station->password = $request->input('password');
            $station->city_id = $request->input('city_id');
            $station->ads_limit = $request->input('ads_limit');
            $station->minutes = $request->input('minutes');
            $station->start = $request->input('start');
            $station->end =  $request->input('end');
            $station->active =  $request->input('active');
            
            $station->save();

            //watcher exclusive
            if($station->save() && $station->type == "Watcher"){
                $watcher =  $watcher = Watcher::where('station_ref',$station->id)->first();
                $watcher->text = $request->input('text');
                $watcher->zip_code = $request->input('zip_code');
                $watcher->action = $request->input('action');
                $watcher->active = $request->input('active');
                $watcher->station_id = $request->input('station_id');
                $watcher->station_ref = $station->id;
                $watcher->save();
            }
        });
        return response()->success(compact('station'));

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $station = Station::find($id);
        
        if($station->type =="Watcher"){
            $watcher = Watcher::where('station_ref',$station->id)->first();
            if($watcher->delete()){
                $station->delete();
            }

        }else{
            $station->delete();

        }
        return response()->success('success');
    }
}
