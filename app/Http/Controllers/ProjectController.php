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
use App\Wallet;
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
            $user_project->user_id = $request->input('empresario_id');
            ;//Funcesi, se debe cambiar por seleccionado por usuario
            $user_project->project_id = $project->id;
            $role = Role::where("slug", "empresario")->get();
            $user_project->role = $role[0]->id;
            $user_project->save();

        //Set ownerships of asesor
            $user_project = new ProjectUser;
            $user_project->user_id = $request->input('user_id');
            ;//Funcesi, se debe cambiar por seleccionado por usuario
            $user_project->project_id = $project->id;
            $role = Role::where("slug", "asesor")->get();
            $user_project->role = $role[0]->id;
            $user_project->save();
        }, 5);
    
        return response()->success(compact('project'));
    }
  
    public function index()
    {

        $user = Auth::user();
        $projects = [];
        $product_total = 0;
        $result_total = 0;
        $budget_total = 0;

        //TODO: this can be change to only depend on projectsuser model

        if ($user->is("asesor")) {
          //If asesor, it will return all created by him,
            $projects = $user->projects;
            $this->project_total($projects);
        } else {
          //if empresario, it wil first chech the relation projectsuser, to find all project where hi is participating as empresario
            if ($user->is('empresario')) {
                $projectsuser= $user->projectsuser;
               
                foreach ($projectsuser as $projectuser) {
                    $projectuser->projects->users=$projectuser->projects->users;
                    $projects[]=  $projectuser->projects;
                     $this->project_total($projects);
                 // $project;
                }
            }
        }
      

    
        return response()->success(compact('projects'));
    }

    function project_total($projects)
    {

        $project_fecha_fin = "1000-02-20";
        foreach ($projects as $project) {
                $products_total = 0;
                $budgets_total = 0;
                $project->results=$project->results;
                $project_wallet_total = 0;
            foreach ($project->results as $key => $result) {
                $product_checked = 0;

                foreach ($result->products as $key => $product) {
                    $products_total++;

                    //Determinar prductos activos
                    if ($product->checkEmpresario == 1) {
                        $product_checked++;
                    }

                    //calcular total wallet
                    $product_wallet_total = 0;
                    foreach ($product->wallets as $key => $wallet) {
                        $product_wallet_total +=  $wallet->cantidad;
                    }
                    $product->product_wallet_total = $product_wallet_total;
                    $project_wallet_total += $product_wallet_total;


                    //Determinar fecha mas lejana para determinar fin del proyecto
                    $start_date = strtotime($project_fecha_fin);
                    $end_date = strtotime($product->fecha_fin);
                    if ($start_date < $end_date) {
                        $project_fecha_fin =  $product->fecha_fin;
                    }
                    foreach ($product->budgetproducts as $key => $budget) {
                        $budgets_total += $budget->valor_unitario*$budget->cantidad;
                    }
                }

                 $result->progress = round(($product_checked/ ($products_total+1))*100, 2);
            }

                $project->results_total = $project->results->count();
                $project->products_total = $products_total;
                $project->budgets_total = $budgets_total;
                $project->project_wallet_total = $project_wallet_total;
                $project->users=$project->users;
                $project->fecha_fin = $project_fecha_fin;
        }

        return true;
    }

    public function delete($id)
    {
        $project = Project::find($id);
        $project->delete();
        return response()->success('success');
    }

    public function show($id)
    {
      //Traer MIS proyectos en los cuales tengo rol de empresario
        $project = Project::with("results.products.budgetproducts.budgets_desc", "results.products.wallets")
        ->with(
            array("users"=>function ($q) {
                $q->where("role", 7);//empresario
            })
        )
        ->find($id);

        $this->project_total([$project]);
        

       //   $budgets = Budget::with("budgetproducts.results")->get();
      
   
        return response()->success($project);
    }
}
