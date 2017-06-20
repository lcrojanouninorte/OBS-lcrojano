<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Project;
use App\User;
use Auth;

class ProjectController extends Controller
{
    //
    public function create(Request $request)
  {
      $this->validate($request, [
        'titulo' => 'required',
        'desc' => 'required',
        'process_id' => 'required',
        'user_id' => 'required'
        ]);
    
      $project = new Project;
      $project->titulo = $request->input('titulo');
      $project->desc = $request->input('desc');
      $project->process_id = $request->input('process_id');
      $project->user_id = $request->input('user_id');

      $project->estado = "primary";
      $project->progress = 0;
      $project->save();
    
      return response()->success(compact('project'));
  }
  
      public function index()
  {

      $user = Auth::user();
      $projects = $user->projects;

    
      return response()->success(compact('projects'));
  }

   public function delete($id)
  {
        $project = Project::find($id);
        $project->delete();
        return response()->success('success');
  }

  public function show($id)
  {
        $project = Project::find($id);
        return response()->success($project);
  }

}
