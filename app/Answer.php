<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    //
    protected $fillable = ['user_id','question_id', 'value' ];

    public function questions(){
        return $this->belongsTo(Question::class, 'question_id');
    }
    public function users(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
