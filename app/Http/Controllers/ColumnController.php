<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Column;

use App\Log;

use Auth;

use DB;

 
class ColumnController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $columns = Column::with(["stations.files"])->get()->each(function($column) {
   
            $column->setRelation("stations", $column->stations->keyBy('id')); 
            $id = $column->id; 
            $column->stations->each(function($station) use ($id) {
                $file = $station->files->each(function($file) use ($id,$station) {
                    if($id == $file->column_id){
                        $station->file = $file;
                    }
                });
                
            });
          
        });

        


        

        
        
        return response()->success(compact('columns'));
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
        'name' => 'required'
         ]);

        try {
            $column = [];
        //check if have file
        // DB::transaction(function () use ($request, $user,  $column) {
            $column = new Column;
            $log = new Log;
            $log->desc = "User ($user->id, $user->name): ADD  ";
            $log->user_id = $user->id;
            $log->table = "columns";

            if($request->has('id')){
                $column =  Column::find($request->input('id'));
                $log->desc = "User ($user->id, $user->name): UPDATE  ";
                
            }
            //add or update column
            $column->name = trim($request->input('name'));
            $column->type = "file";
            $column->max_file_size = 100;
            $column->state = 1;
            $column->order = 1; 
            
            if($column->save()){
                $log->table_id = $column->id;
                $log->desc = $log->desc." COLUMN ($column->id, $column->name).";
                $log->save();
            }
       // });
        } catch (Exception $e) {
            return response()->error($e->getMessage());
        }
        return response()->success(compact('column'));


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
        //
        $user = Auth::user();

        $column = Column::find($id);
        //Delete folder and files
        if($column->delete()){
            $log = new Log;
            $log->desc = "($user->id, $user->name): DELETE column ($column->id, $column->name).";
            $log->user_id = $user->id;
            $log->table = "columns";
            $log->table_id = $column->id;
            $log->save();
        }

      

 
        return response()->success('success');
    }
}
