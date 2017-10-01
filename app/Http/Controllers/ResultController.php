<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Result;

class ResultController extends Controller
{
    //
  public function create(Request $request)
  {
      $this->validate($request, [
        'titulo' => 'required',
        'indicador' => 'required',
        'meta' => 'required',
        'fuenteverificacion' => 'required',
        'fecha_inicio' => 'required'
        ]);
      $result = new Result;
      $result->titulo = $request->input('titulo');
      $result->indicador = $request->input('indicador');
      $result->meta = $request->input('meta');
      $result->fuenteverificacion = $request->input('fuenteverificacion');
      $result->project_id = $request->input('project_id');
      $result->fecha_inicio = $request->input('fecha_inicio');

      $result->estado = "primary";
 
      $result->save();
      return response()->success(compact('result'));
  }
      public function index($project_id)
  {

      $results = Result::where("project_id", $project_id)->get();
      $results->products = $results->products;
      return response()->success(compact('results'));
  }

   public function delete($id)
  {
        $result = Result::find($id);
        $result->delete();
        return response()->success('success');
  }

  public function show($id)
  {
        $result = Result::find($id)->with("products");
        //$result->products = $result->products;
        return response()->success(compact("result"));
  }


}
