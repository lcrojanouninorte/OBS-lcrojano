<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Bican\Roles\Models\Permission;
use Bican\Roles\Models\Role;
use App\Project;
use App\User;
use App\ProjectUser;
use App\Budget;
use Auth;
use DateTime;
use DB;

class ProjectController extends Controller
{
    //
    public function create(Request $request)
  {
      $user = Auth::user();




      //TODO: set ownership of project

      $this->validate($request, [
        'titulo' => 'required',
        'desc' => 'required',
        'process_id' => 'required',
        'user_id' => 'required',
        'empresario_id' => 'required',
        'fecha_inicio' => 'required'
        ]);
      DB::transaction(function () use ($request, $user) {
      $project = new Project;
      $project->titulo = $request->input('titulo');
      $project->desc = $request->input('desc');
      $project->process_id = $request->input('process_id');
      $project->user_id = $user->id;
      $project->fecha_inicio = new \DateTime($request->input('fecha_inicio'));

      $project->estado = "primary";
      $project->progress = 0;
      $project->save();


      //Set ownerships of empresario
      $user_project = new ProjectUser;
      $user_project->user_id = $request->input('empresario_id');;//Funcesi, se debe cambiar por seleccionado por usuario
      $user_project->project_id = $project->id;
      $role = Role::where("slug", "empresario")->get();
      $user_project->role = $role[0]->id;
      $user_project->save();

      //Set ownerships of asesor
      $user_project = new ProjectUser;
      $user_project->user_id = $request->input('user_id');;//Funcesi, se debe cambiar por seleccionado por usuario
      $user_project->project_id = $project->id;
      $role = Role::where("slug", "asesor")->get();
      $user_project->role = $role[0]->id;
      $user_project->save();
    },5);
    
      return response()->success(compact('project'));
  }
  
      public function index()
  {

      $user = Auth::user();
      $projects = [];
      if($user->is("asesor")){
        //return all created by the admin
        $projects = $user->projects;
        foreach ($projects as $project) {
          $project->results=$project->results;
          $project->users=$project->users;
        }
    
      }else{
        //Return only where user is owner
        if($user->is('empresario')){
          $projectsuser= $user->projectsuser;
          //$projects = ProjectUser::where("user_id", $user->id)->where("role", 7)->get();
          foreach ($projectsuser as $projectuser) {
            $projectuser->projects->users=$projectuser->projects->users;
           $projects[]=  $projectuser->projects;
           // $project;
          }
        }
      }
      

    
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
        $project = Project::with("results.products.budgetproducts.budgets_desc")->with(
          array("users"=>function($q){
              $q->where("role", 7);
            })
        )->find($id);

     //   $budgets = Budget::with("budgetproducts.results")->get();
      
   
        return response()->success($project);
  }

}
