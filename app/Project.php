<?php

namespace App;

use App\ProjectUser;

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
    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }
}
