<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class WatcherController extends Controller
{
   /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $watchers = Watcher::with('bots')->get();
        return response()->success(compact('watchers'));
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
         
        //check if have file
        DB::transaction(function () use ($request, $user) {
            $watcher = new Watcher;

            if($request->has('id')){
                $watcher =  Watcher::find($request->input('id'));
            }
            //LesPac exclusive:
            $watcher->zip_code = $request->input('zip_code');
            $watcher->text = $request->input('text');
            $watcher->bot_id = $request->input('bot_id');
            $watcher->active = $request->input('active');
            $watcher->action = $request->input('action');
          
            
        
            if($watcher->save()){
 
            };


        });
        return response()->success(compact('watcher'));
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
        $watcher = Watcher::find($id);
        $bot->delete();
        return response()->success('success');
    }
}
