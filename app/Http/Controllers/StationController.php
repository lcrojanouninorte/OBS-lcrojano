<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Station;

use App\Log;

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
        'name' => 'required',
        'latitude' => 'required',
        'longitude' => 'required',
        'state' => 'required'
         ]);

        try {
            $station = [];
        //check if have file
        // DB::transaction(function () use ($request, $user,  $station) {
            $station = new Station;
            $log = new Log;
            $log->desc = "User ($user->id, $user->name): ADD ";
            $log->user_id = $user->id;
            $log->table = "stations";

            if($request->has('id')){
                $station =  Station::find($request->input('id'));
                $log->desc = "User ($user->id, $user->name): UPDATE ";
                
            }
            //add or update station
            $station->name = $request->input('name');
            $station->latitude = $request->input('latitude');
            $station->longitude = $request->input('longitude');
            $station->state = $request->input('state'); 
            $station->icon = "river3"; 
           
            
            if($request->hasFile('files')){
                $files  = $request->file('files');
                foreach ($files as $key => $file) {
                    
                    $destinationPath = "";
                    $fileName = $file->getClientOriginalName();
                    $extencion = explode(".", $fileName)[1];
                    $station->name = trim($station->name);
                    //$station->name = str_replace(" ", "\ ", $station->name);
                    switch ($key) {//Siempre se debe enviar en orden duración, frecuencia y txt
                        case 0:
                            $destinationPath = "$station->name/duracion.$extencion";
                            $station->duration = $destinationPath;
                            break;
                        case 1:
                            $destinationPath = "$station->name/frecuencia.$extencion";
                            $station->frequencies = $destinationPath;
                            break;
                        case 2:
                            $destinationPath = "$station->name/serie.$extencion";
                            $station->readings_csv = $destinationPath;
                            break;
                        default:
                            # code...
                            break;
                    }
                  
                    $path = Storage::disk('plataforma')->put(
                        $destinationPath,
                        file_get_contents($file->getRealPath())
                    );
                    

                }
                
                
            }
            if($station->save()){
                $log->table_id = $station->id;
                $log->desc = $log->desc." station ($station->id, $station->name).";
                $log->save();
            }
       // });
        } catch (Exception $e) {
            return response()->error($e->getMessage());
        }
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
        $user = Auth::user();

        $station = Station::find($id);
        //Delete folder and files
        if($station->delete()){
            Storage::disk('plataforma')->deleteDirectory($station->name);
            $log = new Log;
            $log->desc = "($user->id, $user->name): DELETE station ($station->id, $station->name).";
            $log->user_id = $user->id;
            $log->table = "stations";
            $log->table_id = $station->id;
            $log->save();
        }

      

 
        return response()->success('success');
    }
}
