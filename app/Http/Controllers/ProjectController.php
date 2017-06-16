<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Project;

class ProjectController extends Controller
{
    //
    public function create(Request $request)
  {
      $this->validate($request, [
        'title' => 'required',
        'convocatory' => 'required',
        'user_id' => 'required'

        ]);
    
      $project = new Project;
      $project->title = $request->input('title');
      $project->procces_id = $request->input('process_id');
      $project->user_id = $request->input('user_id');
      $project->save();
    
      return response()->success(compact('project'));
  }
}
