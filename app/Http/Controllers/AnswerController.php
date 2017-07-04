<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User;
use App\Answer;
use Auth;
use DB;
class AnswerController extends Controller
{
    //
        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $user =Auth::id();
        //if($user){
	        $data = $request->json()->all();
	        $questions = $data;
	        //TODO: validar cada campo

	        $transaction = DB::transaction(function () use ($questions,$user) {
	            //guardar respuestas
	            foreach ($questions as $key => $question) {
                    if(!empty($question["answers"][0])){
                        $newAnswer = Answer::firstOrNew( array('user_id'=>$user, 'question_id'=>$question["id"]));
                        $newAnswer->value = $question["answers"][0]["value"];
                        $newAnswer->save();
                    }
	            }

	        });

        return response()->success($transaction);

       
    }

    public function chartData($type)
  {
    $user =2;//Auth::id();
    $answers = "";
    if($type==1){
         $answers = DB::table('answers')
                ->select(DB::raw('((SUM(answers.value)/4)*7)/100 as total'))
                ->leftJoin('questions', 'answers.question_id', '=', 'questions.id')
                ->where('answers.user_id', $user)
                ->where('questions.survey_id', $type)//id
                ->groupBy('questions.categoria')
                ->pluck('total');
    }

    if($type == 2){
        $answers = DB::table('answers')
                ->select(DB::raw('((SUM(answers.value)/4)*4)/100 as total'))
                ->leftJoin('questions', 'answers.question_id', '=', 'questions.id')
                ->where('answers.user_id', $user)
                ->where('questions.survey_id', $type)//id
                ->groupBy('questions.categoria')
                ->pluck('total');
    }
        

         
        //$project = Project::find($id);
        return response()->success($answers);
  }


}
