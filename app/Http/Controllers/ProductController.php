<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Validation\Validator;
use App\Http\Requests;
use App\Product;
use App\BudgetProduct;
use Auth;

class ProductController extends Controller
{
    //
    public function store(Request $request)
    {
        $this->validate($request, [
          'desc' => 'required',
          'fecha_inicio' => 'required',
          'fecha_fin' => 'required',
          'result_id' => 'required',
          'id' => 'alpha_num'
        ]);

       

        //check if send id
        $id = $request->input('id');
        if ($id) {
            //editing
            $product = Product::find($id);
        } else {
            //adding
            $product = new Product;
            $product->estado = "nuevo";
            $product->progress = 0;
            $product->checkEmpresario = 3;
            $product->checkAsesor =1;
        }
       
 
          
          $product->desc = $request->input('desc');
          $product->fecha_inicio = $request->input('fecha_inicio');
          $product->fecha_fin = $request->input('fecha_fin');

          //calcular duracion
          $datetime1 = new \DateTime($request->input('fecha_inicio'));
          $datetime2 = new \DateTime($request->input('fecha_fin'));

          $interval =  $datetime2->diff($datetime1);
          $duracion = ($interval->format('%y') * 12) + $interval->format('%m');
          $product->duracion = ($duracion==0)?1:$duracion;
          $product->result_id = $request->input('result_id');

          $product->save();
          return response()->success(compact('product'));
    }

    public function index($result_id)
    {

        $product = Product::where("result_id", $result_id)->get();
      
        return response()->success(compact('product'));
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->success('success');
    }

    public function updateCheck(Request $request)
    {
        $product_id = $request->input('id');
   
        $current_user = Auth::user();
        $product = Product::find($product_id);
        
        if ($current_user->is('asesor')) {
            $product->checkAsesor = $request->input('checkEmpresario');
        } else {
            if ($current_user->is('empresario')) {
                $product->checkEmpresario = $request->input('checkEmpresario');
            }
        }
         $product ->save();
        
        return response()->success(compact("product"));
    }

    public function show($id)
    {
        $product = Product::find($id);
        return response()->success($product);
    }

    
    public function addBudget(Request $request)
    {

    /*  $this->validate($request, [
          'desc' => 'required',
          'fecha_inicio' => 'required',
          'fecha_fin' => 'required',
          'result_id' => 'required',
        ]); */
       
 
        $budget_product = new BudgetProduct;
        $budget_product->user_id = $request->input('user_id');
        $budget_product->product_id = $request->input('product_id');
        $budget_product->budget_id = $request->input('budget_id');
        $budget_product->descripcion = $request->input('descripcion');
        $budget_product->unidad = $request->input('unidad');
        $budget_product->cantidad = $request->input('cantidad');
        $budget_product->valor_unitario = $request->input('valor_unitario');
        $budget_product->financiacion_sena = $request->input('financiacion_sena');
        $budget_product->c_especie = $request->input('c_especie');
        $budget_product->c_efectivo = $request->input('c_efectivo');

     
        $budget_product->estado = "nuevo";

        $budget_product->save();
          return response()->success(compact('budget_product'));
    }

 /* public function show($project_id)
    {

        $budgets = Budget::with(array("products.results.projects"=>function($q){
          $q->where("id", $sproject_id);
        }))->with(array("budgetproducts"=>function($q){
          $q->select( DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total'))->get();
        }))->get();

        return response()->success( compact("budgets"));
    }*/
}
