<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Result;

use App\product;

use Auth;

use Storage;

class ResultController extends Controller
{
    //
    public function store(Request $request)
    {
        $this->validate($request, [
            'titulo' => 'required',
            'indicador' => 'required',
            'meta' => 'required',
            'fuenteverificacion' => 'required',
            'fecha_inicio' => 'required',
            'id' => 'alpha_num'
        ]);


        //check if send id
        $id = $request->input('id');
        if ($id) {
            //editing
            $result = Result::find($id);
        } else {
            $result = new Result;
            $result->estado = "primary";
            $result->checkEmpresario = 0;
            $result->checkAsesor = 0;
        }
        
        $result->titulo = $request->input('titulo');
        $result->indicador = $request->input('indicador');
        $result->meta = $request->input('meta');
        $result->fuenteverificacion = $request->input('fuenteverificacion');
        $result->project_id = $request->input('project_id');
        $result->fecha_inicio = $request->input('fecha_inicio');

        

 
        $result->save();
        return response()->success(compact('result'));
    }
    public function index($project_id)
    {

        $results = Result::where("project_id", $project_id)->with("products")->get();
        //$results->products = $results->products;
        return response()->success(compact('results'));
    }

    public function destroy($id)
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

    public function updateCheck(Request $request)
    {
        $current_user = Auth::user();
        $result_id = $request->input('id');
        $result = Result::find($result_id);
        
        if ($current_user->is('asesor')) {
            $result->checkAsesor = $request->input('checkAsesor');
        } else {
            if ($current_user->is('empresario')) {
                $result->checkEmpresario = $request->input('checkEmpresario');
            }
        }
         $result->save();
        
        return response()->success($request->input('checkAsesor'));
    }

    public function upload_document(Request $request)
    {
        $this->validate($request, [
            'fuenteverificacion' => 'required|max:2048',
            'result_id' => 'required',
        ]);

        //Get Uploader user
        $user = Auth::user();
        $user_id = $user->id;

        $file = $request->file('fuenteverificacion');
        $result_id = $request->input("result_id");

        if (true||$user->is('empresario')) {//Solo suben archivos los empresarios
            if ($file->isValid()) {
                    $fileName = $file->getClientOriginalName();
                    $destinationPath = "/fficaribe/fuentes_verificacion/".$user_id."/".$result_id.$fileName;

                    $path = Storage::put(
                        $destinationPath,
                        file_get_contents($file->getRealPath())
                    );

                    //Update Result
                    $result = Result::find($result_id);
                    $result->fuente_file = $destinationPath;
                    $result->save();

                    return response()->success($destinationPath);
            } else {
            }
        } else {
        }
    }
}
