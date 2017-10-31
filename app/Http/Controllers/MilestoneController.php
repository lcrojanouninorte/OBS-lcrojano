<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Milestone;

use Auth;

class MilestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
        $user = Auth::user();
        $milestones =[];
        if (true) {
            $milestones = Milestone::where("project_id", $project_id)->get();
        }

        return response()->success(compact('milestones'));
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function delayed($project_id)
    {
        $user = Auth::user();
        $hoy = strtotime(date("Y-m-j"));
        $mes = date("Y-m-j", strtotime("+1 month", $hoy));
        
        $milestones =[];
        if (true) {
            $milestones = Milestone::where("project_id", $project_id)
            ->whereBetween("fecha", array($hoy, $mes))
            ->get();
        }

        return response()->success(compact('milestones'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $this->validate($request, [
            'titulo' => 'required',
            'mensaje' => 'required',
            'project_id' => 'required',
            'fecha' => 'required',
            'dias'  => 'required'
        ]);

        $user = Auth::user();
        $newMilestone = [];
        if ($user->is("asesor")) {//Solo usuarios autenticados asesores.
            $milestone = $request->json()->all();

            $milestone["fecha"] = date("Y-m-j", strtotime($milestone["fecha"]));

            $milestone["user_id"] = $user->id;
            $newMilestone = new Milestone();
            $newMilestone->titulo = $milestone["titulo"];
            $newMilestone->mensaje = $milestone["mensaje"];
            $newMilestone->project_id = $milestone["project_id"];
            $newMilestone->fecha = $milestone["fecha"];
            $newMilestone->dias = $milestone["dias"];
            $newMilestone->user_id = $milestone["user_id"];
            $newMilestone->save();
            return response()->success($newMilestone);
        } else {
            return response()->error("No es asesor");
        }

        return response()->success($milestone);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
