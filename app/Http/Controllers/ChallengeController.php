<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Challenge;
use App\User;
use Auth;
class ChallengeController extends Controller
{
    //

    /**
     * Create new challenge .
     *
     * @return JSON
     */
    public function store(Request $request)
    {

    	//TODO: check is director and auth
    	$user = Auth::user();
    	    	$user_id = $user->id;

        $this->validate($request, [
	        'desc' => 'required',
	        'fecha_inicio' => 'required',
	        'fecha_final' => 'required'
        ]);
   
	      $challenge = new Challenge;
	      $challenge->desc = $request->input('desc');
	      $challenge->fecha_inicio = $request->input('fecha_inicio');
	      $challenge->fecha_fin = $request->input('fecha_final');
	      $challenge->user_id = $user_id;

	      $challenge->estado = 1;//Nuevo, 2 Stop, 3 Finaalizado
	      $challenge->save();
 

        return response()->success(compact($challenge));
    }

  public function index()
  {

      $challenges = Challenge::all();

    
      return response()->success(compact('challenges'));
  }
}
