<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Bot;

use App\Watcher;

use Auth;

use DB;

use Storage;

class BotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $bots = Bot::with('city')->with('watcher.bot')->get();
        return response()->success(compact('bots'));
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
            $bot = new Bot;

            if($request->has('id')){
                $bot =  Bot::find($request->input('id'));
             }
            //LesPac exclusive:
            $bot->type = $request->input('type');
            $bot->current_index = $request->input('current_index');

            

            //$bot->id = $request->input('id'); //Verificar;
            $bot->username = $request->input('username');
            $bot->password = $request->input('password');
            $bot->city_id = $request->input('city_id');
            $bot->ads_limit = $request->input('ads_limit');
            $bot->minutes = $request->input('minutes');
            $bot->start = $request->input('start');
            $bot->end =  $request->input('end');
            $bot->active =  $request->input('active');
            
        
            if($bot->save()){
                $destinationPath = "";
                
                if($request->hasFile('file') && $bot->type=="LesPac"){
                    $file  = $request->file('file');
                    $fileName = $file->getClientOriginalName();
                    $destinationPath = "/".$request->input('type')."/".$bot->id."/".$fileName;
                    $path = Storage::put(
                        $destinationPath,
                        file_get_contents($file->getRealPath())
                    );
                    $bot->file_path = $destinationPath;
                    $bot->save();
                }

                //watcher exclusive
                if($bot->type == "Watcher"){
                    $watcher = new Watcher;
                    $watcher->text = $request->input('text');
                    $watcher->zip_code = $request->input('zip_code');
                    $watcher->action = $request->input('action');
                    $watcher->active = $request->input('active');
                    $watcher->bot_id = $request->input('bot_id');
                    $watcher->bot_ref = $bot->id;
                    $watcher->save();
                }
            };


        });
        return response()->success(compact('bot'));
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
            $bot =  Bot::find($id);

            //LesPac exclusive:
            //$bot->type = $request->input('type');
            $bot->current_index = $request->input('current_index');

            
            
            $bot->username = $request->input('username');
            $bot->password = $request->input('password');
            $bot->city_id = $request->input('city_id');
            $bot->ads_limit = $request->input('ads_limit');
            $bot->minutes = $request->input('minutes');
            $bot->start = $request->input('start');
            $bot->end =  $request->input('end');
            $bot->active =  $request->input('active');
            
            $bot->save();

            //watcher exclusive
            if($bot->save() && $bot->type == "Watcher"){
                $watcher =  $watcher = Watcher::where('bot_ref',$bot->id)->first();
                $watcher->text = $request->input('text');
                $watcher->zip_code = $request->input('zip_code');
                $watcher->action = $request->input('action');
                $watcher->active = $request->input('active');
                $watcher->bot_id = $request->input('bot_id');
                $watcher->bot_ref = $bot->id;
                $watcher->save();
            }
        });
        return response()->success(compact('bot'));

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
        $bot = Bot::find($id);
        
        if($bot->type =="Watcher"){
            $watcher = Watcher::where('bot_ref',$bot->id)->first();
            if($watcher->delete()){
                $bot->delete();
            }

        }else{
            $bot->delete();

        }
        return response()->success('success');
    }
}
