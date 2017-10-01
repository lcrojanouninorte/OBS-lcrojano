<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Budget;
use DB;

class BudgetController extends Controller
{
    //
	  public function index()
	  {

	      $budgets = Budget::with(array("budgetproducts.products.results.projects"=>function($q){
	      	$q->where("id", 97);
	      }))->with(array("budgetproducts"=>function($q){
	      	$q->select( DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
	      }))->get();

	      return response()->success( compact("budgets"));
	  }

	  public function budget_project($project_id)
	  {

	      $budgets = Budget::with(array("budgetproducts.products.results.projects"=>function($q){
	      	$q->where("id", $project_id);
	      }))->with(array("budgetproducts"=>function($q){
	      	$q->select( DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
	      }))->get();

	      return response()->success( compact("budgets"));
	  }

	  public function budget_result($product_id)
	  {

	      $budgets = Budget::with("budgetproducts.products")->with(array("budgetproducts"=>function($q){
	      	$q->select( DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
	      }))->get();

	      return response()->success( compact("budgets"));
	  }

	  public function budget_product($product_id)
	  {

	      $budgets = Budget::with(array("budgetproducts.products"=>function($q) use ($product_id) {
	      	$q->where("id", $product_id);
	      }))->with(array("budgetproducts"=>function($q) use ($product_id){
	      	$q->select( DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total'))
	      	->where("product_id",$product_id)->groupBy("budget_id", "product_id")->get();
	      }))->get();

	      return response()->success( compact("budgets"));
	  }

}
