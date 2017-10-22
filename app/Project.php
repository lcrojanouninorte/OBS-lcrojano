<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
    public function results()
    {
        return $this->hasMany(Result::class);
    }
    public function products()
    {
        return $this->hasManyThrough('App\Product', 'App\Result');
    }
}
