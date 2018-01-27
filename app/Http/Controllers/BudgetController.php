<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Budget;
use App\BudgetProduct;
use DB;

class BudgetController extends Controller
{
    //
    public function index()
    {

        $budgets = Budget::with(array("budgetproducts.products.results.projects"=>function ($q) {
            $q->where("id", 97);
        }))->with(array("budgetproducts"=>function ($q) {
            $q->select(DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
        }))->get();

        return response()->success(compact("budgets"));
    }

    public function destroy($id)
    {
         $budget_product = BudgetProduct::find($id);
         $budget_product->delete();
        return response()->success('success');
    }

    public function budget_project($project_id)
    {

        $budgets = Budget::with(array("budgetproducts.products.results.projects"=>function ($q) {
            $q->where("id", $project_id);
        }))->with(array("budgetproducts"=>function ($q) {
            $q->select(DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
        }))->get();

        return response()->success(compact("budgets"));
    }

    public function budget_result($product_id)
    {

        $budgets = Budget::with("budgetproducts.products")->with(array("budgetproducts"=>function ($q) {
            $q->select(DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total_sales'))->get();
        }))->get();

        return response()->success(compact("budgets"));
    }

    public function budget_product($product_id)
    {

        $budgets = Budget::with(array("wallets"=>function ($q) use ($product_id) {
            $q->where("wallets.product_id", $product_id);
            $q->select(DB::raw('budget_id, wallets.product_id, SUM(wallets.cantidad) as total'))
            ->groupBy("budget_id", "wallets.product_id")->get();
        }))
        ->with(array("budgetproducts"=>function ($q) use ($product_id) {
                    $q->select(DB::raw('id, product_id, budget_id, SUM(cantidad*valor_unitario) as total'))
                    ->where("product_id", $product_id)->groupBy("budget_id", "product_id")->get();
        }))
        ->get();

        return response()->success(compact("budgets"));
    }

    public function budget_desc_product($budget_id, $product_id)
    {

        //TODO AUTH

        //Paso 1: Obtener solo los budgets/rubros que tiene gastos ingresados por el asesor
        $budgets =
        BudgetProduct::with("budgets_desc")
        ->with(array("wallets"=>function ($q) use ($product_id) {
            $q->select(DB::raw('id, product_id, budget_product_id, SUM(cantidad) as total'))->groupBy("budget_product_id", "product_id")->get();
        }))
        ->with(array("wallets_executed"=>function ($q) use ($product_id) {
            //Paso 2:Para cada budgets/rubros obtener el total ejecutado desagregado por CP, CE, Sena

            $q->select(DB::raw('id, product_id, budget_product_id, type, SUM(cantidad) total_executed'))->groupBy("type", "budget_product_id", "product_id")->orderBy('type', "DESC")->get();
            //Orden de los totales para wallet: sena, cp, ce
        }))
        ->where("product_id", $product_id)
        ->where("budget_id", $budget_id)
        ->select("budget_product.id", "descripcion as titulo", "product_id", "budget_id", "unidad", "cantidad", "valor_unitario", "financiacion_sena", "c_especie", "c_efectivo", "estado", DB::raw("cantidad*valor_unitario as total"))
        ->get();



        //organizar los resultado de la forma, "cp":"{}"

        foreach ($budgets as $budget) {
            foreach ($budget["wallets_executed"] as $key => $executed) {
                $budget["wallets_executed"][$executed["type"]] = $executed;
                unset($budget["wallets_executed"][$key]);
            }
        }

        return response()->success(compact("budgets"));
       //

/*
         $total_executed =
        BudgetProduct::with(array("wallets"=>function ($q) use ($product_id) {
            $q->select(DB::raw('id, product_id, budget_product_id, type, SUM(cantidad) total_executed'))->groupBy("type", "budget_product_id", "product_id")->orderBy('type', "DESC")->get();
            //Orden de los totales para wallet: sena, cp, ce
        }))
        ->where("product_id", $product_id)
        ->where("budget_id", $budget_id)
        ->select("budget_product.id")
        ->get();

        return response()->success(compact("total_executed"));


        //Obtener  wallet executed: puede mejorar! pero por tiempo toco asi ...
        $total=[];
        $rubros_ejecutados = $total_executed[0]["wallets"];
        return response()->success(compact("rubros_ejecutados"));
        foreach ($rubros_ejecutados as $key => $rubro_ejecutado) {
            $total[$rubro_ejecutado["type"]] = $rubro_ejecutado;
        }
        $budgets[0]["wallets_executed"] = $total;



        return response()->success(compact("budgets"));*/
    }
}
