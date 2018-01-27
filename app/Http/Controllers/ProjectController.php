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
use App\Milestone;
use Auth;
use DateTime;
use DB;
use Response;
use Storage;



use PDF;
use Excel;

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
        'fecha_inicio' => 'required',
        'id' => 'alpha_num',
        'asesor_id'  => 'alpha_num'
        ]);


        
        DB::transaction(function () use ($request, $user) {
            //check if send id
            $id = $request->input('id');
            if ($id) {
                $project = Project::find($id);
            } else {
                $project = new Project;
                $project->user_id = $user->id; //Verificar;
                $project->estado = "primary";
                $project->progress = 0;
            }
            $project->titulo = $request->input('titulo');
            $project->desc = $request->input('desc');
            $project->process_id = $request->input('process_id');
            $project->fecha_inicio = new \DateTime($request->input('fecha_inicio'));
            $project->save();


            //Set ownerships of empresario
            //Limitado solo a un empresario por proyect
            if ($id) {
                //Cambiar de empresario
                $role = Role::where("slug", "empresario")->get();
                $user_project = ProjectUser::where("role", $role[0]->id)
                               ->where("project_id", $project->id)->get();
                $user_project = $user_project[0];


                //cambiar asesor

                $role = Role::where("slug", "asesor")->get();
                $asesor_project = ProjectUser::where("role", $role[0]->id)
                               ->where("project_id", $project->id)->get();
                $asesor_project = $asesor_project[0];
                $asesor_project->user_id = $request->input('asesor_id');
                $asesor_project->save();
                $project->user_id = $request->input('asesor_id');
            } else {
                $user_project = new ProjectUser;
                $user_project->project_id = $project->id;
                $role = Role::where("slug", "empresario")->get();
                $user_project->role = $role[0]->id;
            }

            $user_project->user_id = $request->input('empresario_id');
            $user_project->save();


            if (!$id) {
                //Set ownerships of asesor
                $user_project = new ProjectUser;
                $user_project->user_id = $request->input('user_id');
                $user_project->project_id = $project->id;
                $role = Role::where("slug", "asesor")->get();
                $user_project->role = $role[0]->id;
                $user_project->save();
            }
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
        if ($user->is('supervisor')) {
            $projects = Project::all();
            $this->project_total($projects);
            return response()->success(compact('projects'));
        }

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
            } else {
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

    /**
     * Return data for display in gantt,
     * I Decide to create a new function
     * To be able to change name of variable to adat to angular gantt
     *
     * @return JSON
     */
    public function show_gantt($id)
    {
      //Traer MIS proyectos en los cuales tengo rol de empresario
        $project = Project::
        with("results.products.budgetproducts.budgets_desc", "results.products.wallets")
        ->with(
            array(
            "results"=>function ($q) {
                $q->select(
                    "results.titulo as name",
                    "results.id",
                    "results.project_id",
                    "results.fecha_inicio as fi"
                );
            },
            "results.products"=>function ($q) {
                $q->select(
                    "products.desc as name",
                    "products.fecha_inicio as from",
                    "products.fecha_fin as to",
                    "products.fecha_fin",
                    "products.checkEmpresario",
                    "products.id",
                    "products.estado",
                    "products.result_id",
                    "products.progress",
                    "products.checkEmpresario as classes"
                );
            }

            )
        )
        
        ->with(
            array("users"=>function ($q) {
                $q->where("role", 7);//empresario
            })
        )
        ->find($id);

         $this->project_total([$project]);



        //Adaptar a la forma solicitada por angular gantt
        //Actualemnte tenemos Result->products, necesitamos que product sea un result, y a su ves asigarlo como task.
        $delayed_products_count = 0; //Conteo de productos atrasados
        $products_to_result = array();

        foreach ($project->results as $key => $result) {
            $result_id = $result->id;
            foreach ($result->products as $key => $product) {
                //Calcular si el producto esta atrasado y asignar un color para le gantt
                $today =  date('Y-m-j');
                $productTo = date("Y-m-j", strtotime($product->to));
                $productFrom = date("Y-m-j", strtotime($product->from));
                //$product->classes contiene el estado del producto, 1 es finalizado, por lo que no se tiene en cuenta
                if ($product->to!=null
                    && $product->classes != 1 //No esta finalizado
                    && (strtotime($productTo) <= strtotime($today)) //Ya paso la fecha fin, con respecto a hoy
                    && (strtotime($productFrom) <= strtotime($today)) //Solo si inicia antes de hoy
                ) {
                    $delayed_products_count++;
                    $product->classes = "color-task-4";
                } else {
                    $product->classes = "color-task-".$product->classes;
                }




                //clonar el producto para convertirlo en una task de este producto
                $tasks = clone $product;
                //$tasks->id = $product->name;
                $product->parent=$result->id;
                $product->tasks = array($tasks);
                //Guardar producto en un array para añdirlo al array results al final
                $project->results[] = $product;

                //Quitar Productos del resultado
                unset($result->products[$key]);
            }
        }

        $project->delayed_products_count = $delayed_products_count;

        $milestones = Milestone::where("project_id", $project->id)->get();
        //Determinar si se debe mostrar una alerta, cada 31 dias de anticipación a la fecha del hito
        $alerta_milestiones=0;
        foreach ($milestones as $key => $milestone) {
            $hoy = date("Y-m-j");
            $hito =  $milestone->fecha;
            //difference between hito y hoy
            $diff = $this->dateDifference($hoy, $hito);
            $milestone->diferencia = $diff;
            if ($milestone->diferencia <= 31) {
                 $alerta_milestiones++;
            //TODO::
            //Enviar correo si cumple la condicion,
                //Solo enviar si no se ha enviado,
                //marcar en bd que si ya se le encvio por projecto
            }
        }

        $project->milestones = $milestones;
        $project->alerta_milestiones = $alerta_milestiones;
    
        return response()->success($project);
    }

        //GLOBAL FUNCTION HELPER
    public function file_download(Request $request)
    {
        $filePath = $request->input("filePath");
        $parts = explode('/', $filePath);
        $filename = array_pop($parts);

        $file = Storage::disk('local')->get($filePath);
        return response()->download(storage_path()."/"."app"."/".$filePath);

        return (new Response($file, 200))
           // ->header('Content-Type', 'application/vnd.ms-excel')
            ->header("Content-Disposition: attachment; filename='".$filename."'");
       //Check if can retrieve name
        return $contents;
    }

    public function get_products($id, $date = null)
    {
        if ($date != null) {
                //$newdate = strtotime('-1 month', strtotime($date)) ;
               // $newdate = date('Y-m-j', $newdate);
               // return response()->success($newdate);
            $todayDate = date("Y-m-j", strtotime($date));

            $project = Project::with(
                array("products" => function ($q) use ($todayDate) {
                    $q->where("products.fecha_fin", '<=', $todayDate)
                    ->where("products.fecha_inicio", '<=', $todayDate)
                    ->where("products.checkEmpresario", '!=', '1');
                })
            )->find($id);
        } else {
            $project = Project::with("products")->find($id);
        }

            $products_total = 0;
            $product_wallet_total = 0;
            $budgets_total = 0;
        foreach ($project->products as $key => $product) {
                $products_total++;

                //calcular total wallet
            foreach ($product->wallets as $key => $wallet) {
                $product_wallet_total +=  $wallet->cantidad;
            }
                $product->product_wallet_total = $product_wallet_total;
                

 
            foreach ($product->budgetproducts as $key => $budget) {
                $budgets_total += $budget->valor_unitario*$budget->cantidad;
                $product->budgets_total += $budget->valor_unitario*$budget->cantidad;
            }
                //Calcular procentaje ejecutado
                $product->progress =($product->budgets_total)? ($product_wallet_total/$product->budgets_total)*100:0;
        }
        

        return response()->success($project);
    }

    public function get_pdf($project_id)
    {
        //Verfy if auth, and owner
 

        return PDF::loadFile('http://localhost:8000/')->inline('github.pdf');
    }

    public function get_excel($project_id)
    {
        $project = Project::with('results')->find($project_id)->get();

        //return response()->success($project);
        Excel::create('Project', function ($excel) use ($project) {
             
            $excel->sheet('Project', function ($sheet) use ($project) {
                $sheet->fromArray($project);
            });
        })->export('xlsx');
    }

     public function get_excel2($project_id)
    {
        //Traer MIS proyectos en los cuales tengo rol de empresario
        $project = Project::
        with("results.products.budgetproducts.budgets_desc", "results.products.wallets")
        ->with(
            array(
            "results.products.budgetproducts.wallets"=>function ($q) {
                $q->select(
                    "wallets.desc",
                    "wallets.cantidad",
                    "wallets.doc",
                    "wallets.type",
                    "wallets.id",
                    "wallets.budget_product_id"
                );
            },
            "results"=>function ($q) {
                $q->select(
                    "results.titulo",
                    "results.id",
                    "results.project_id",
                    "results.fecha_inicio"
                );
            },
            "results.products"=>function ($q) {
                $q->select(
                    "products.desc",
                    "products.fecha_inicio",
                    "products.fecha_fin",
                    "products.checkEmpresario",
                    "products.id",
                    "products.estado",
                    "products.result_id",
                    "products.progress",
                    "products.checkEmpresario"
                );
            }

            )
        )
        
        ->with(
            array("users"=>function ($q) {
                $q->where("role", 7);//empresario
            })
        )
        ->find($project_id);

         $this->project_total([$project]);



       // return response()->success($project);
        Excel::create('Reporte', function($excel) use ($project) {
              

            $excel->sheet('Reporte', function($sheet) use ($project) {
                $sheet->loadView('reports.financial_report')->with('project', $project);;
                $sheet->setStyle(array(
                    'font' => array(
                        'name'      =>  'Calibri',
                        'size'      =>  12,
                        
                    )
                ));

                 $sheet->setWidth('A', 20);
                 $sheet->setWidth('B', 60);
            });

            $lastrow= $excel->getActiveSheet()->getHighestRow();  
 
            $excel->getActiveSheet()->getStyle('A1:A'.$lastrow)->getAlignment()->setWrapText(true); 
        })->download('xls');
        
        return Redirect::back()->withErrors(['msg', 'The Message']);
    }
    //HELPERS

    function project_total($projects)
    {

        $project_fecha_fin = "1000-02-20";//Para buscar la fecha final.

        foreach ($projects as $project) {
            $products_total = 0;
            $budgets_total = 0;
            $project->results=$project->results;
            $project_wallet_total = 0;


            foreach ($project->results as $key => $result) {
                $result_fecha_fin = "1000-02-20";
                $product_checked = 0;

                foreach ($result->products as $key => $product) {
                    $products_total++;


                    //Determinar productos activos
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
                        $result_fecha_fin = $product->fecha_fin;
                    }

                    foreach ($product->budgetproducts as $key => $budget) {
                        $budgets_total += $budget->valor_unitario*$budget->cantidad;
                        $product->budgets_total += $budget->valor_unitario*$budget->cantidad;
                    }
                    //Calcular procentaje ejecutado
                    $product->progress =($product->budgets_total)? ($product_wallet_total/$product->budgets_total)*100:0;
                }

                //Actualizar fecha fin result
                $result_fecha_fin = ($result_fecha_fin == "1000-02-20")?"":$result_fecha_fin;
                $result->fecha_fin=$result_fecha_fin;

                if ($products_total>0) {
                    $result->progress = round(($product_checked/ ($products_total))*100, 2);
                } else {
                    $result->progress = 0;
                }
            }

            $project_fecha_fin = ($project_fecha_fin == "1000-02-20")?"":$project_fecha_fin;
            $project->fecha_fin = $project_fecha_fin;

            $project->results_total = $project->results->count();
            $project->products_total = $products_total;
            $project->budgets_total = $budgets_total;
            $project->project_wallet_total = $project_wallet_total;
            $project->users=$project->users;
        }

        return true;
    }

    function dateDifference($date_1, $date_2, $differenceFormat = '%a')
    {
 

        $datetime1 = date_create($date_1);
        $datetime2 = date_create($date_2);
        
        $interval = date_diff($datetime1, $datetime2);
        
        return $interval->format($differenceFormat);
    }
}
