<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    //
    public function projects(){
        return $this->belongsTo(Project::class, "project_id", "id");
    }
    
    public function products(){
        return $this->hasMany(Product::class);
    }
}
