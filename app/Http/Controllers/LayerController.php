<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Layer;

use Auth;

use DB;

class LayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $layers = Layer::get()->groupBy('category_id');
        return response()->success(compact('layers'));

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
        $this->validate($request, [
        'name' => 'required',
        'category_id' => 'required',
        'shp_zip_path' => 'required',
        'state' => 'required',

         ]);

        try {
            $layer = [];
            $layer = new Layer;
            $log = new Log;
            $log->desc = "User ($user->id, $user->name): ADD  ";
            $log->user_id = $user->id;
            $log->table = "layers";
            //add or update layer
            if($request->has('id')){
                $layer =  layer::find($request->input('id'));
                $log->desc = "User ($user->id, $user->name): UPDATE  ";
                
            }
            $layer->name = trim($request->input('name'));
            $layer->category_id = $request->input('category_id');
            $layer->state = $request->input('state');
            $layer->icon = $request->input('icon'); 

            //Custom case: REAL TIME categoria 1
            if($layer->category_id==1){

            }

            //unzip files
            //convert to geojson
            //store paths



            
            if($layer->save()){
                $log->table_id = $layer->id;
                $log->desc = $log->desc." Layer ($layer->id, $layer->name).";
                $log->save();
            }
       // });
        } catch (Exception $e) {
            return response()->error($e->getMessage());
        }
        return response()->success(compact('layer'));

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
  
        $user = Auth::user();

        $layer = Layer::find($id);
        //Di categoria es 1, es decir sensor en tiempo real no borrar, 
        
        //Delete folder and files
        if($layer->delete()){
            $log = new Log;
            $log->desc = "($user->id, $user->name): DELETE category ($layer->id, $layer->name).";
            $log->user_id = $user->id;
            $log->table = "layers";
            $log->table_id = $layer->id;
            $log->save();
        }

    
 
        return response()->success('success');
    }
}
