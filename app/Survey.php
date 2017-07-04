<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    //
    public function questions(){
        return $this->hasMany(Question::class);
    }
    public function answers()
    {
        return $this->hasManyThrough('App\Answer', 'App\Question','survey_id', 'user_id', 'id');
    }
}
