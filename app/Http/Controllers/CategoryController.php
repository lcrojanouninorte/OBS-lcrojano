<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Layer;

use App\Category;

use App\Log;

use Auth;

use DB;

use Avatar;
// import the Avatar class
 



class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $categories = Category::with("layers")->get();
        return response()->success(compact('categories'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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

        
        //
        
        $user = Auth::user();
        $this->validate($request, [
        'name' => 'required',
        'state' => 'required'

         ]);



        try {
            $category = [];
        //check if have file
        // DB::transaction(function () use ($request, $user,  $category) {
            $category = new Category;
            $log = new Log;
            $log->desc = "User ($user->id, $user->name): ADD  ";
            $log->user_id = $user->id;
            $log->table = "categories";

            if($request->has('id')){
                $category =  Category::find($request->input('id'));
                $log->desc = "User ($user->id, $user->name): UPDATE  ";
            }
            //add or update category
            $category->name = trim($request->input('name'));
            $category->state = trim($request->input('state'));
            $category->public_desc = trim($request->input('public_desc'));
            $category->admin_desc = trim($request->input('admin_desc'));

         

            $img = Avatar::create($category->name.'@obsriomagdalena.com')
                            ->toGravatar(['d' => 'identicon', 'r' => 'g', 's' => 48]);
            // Output: http://gravatar.com/avatar/0dcae7d6d76f9a3b14588e9671c45879?d=identicon&r=pg&s=100
            $category->icon = $img;
            
            if($category->save()){
                $log->table_id = $category->id;
                $log->desc = $log->desc." Category ($category->id, $category->name).";
                $log->save();
            }
       // });
        } catch (Exception $e) {
            return response()->error($e->getMessage());
        }
        return response()->success(compact('category'));
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
        
        if($id==1){
            return response()->error("No es posible eliminar la categoria de sensores en tiempo real");
        }
        $user = Auth::user();

        $category = Category::find($id);
        //Di categoria es 1, es decir sensor en tiempo real no borrar, 
        
        //Delete folder and files
        if($category->delete()){
            $log = new Log;
            $log->desc = "($user->id, $user->name): DELETE category ($category->id, $category->name).";
            $log->user_id = $user->id;
            $log->table = "categorys";
            $log->table_id = $category->id;
            $log->save();
        }

    
 
        return response()->success('success');
    }
}
