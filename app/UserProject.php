<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProjectUser extends Model
{
    protected $table = 'project_user';
    //
    protected $fillable = [
        'role',
    ];

    public function users()
    {
        return $this->belongsToMany('App\User')
        ->withTimestamps();
    }

    public function projects()
    {
        return $this->belongsToMany('App\Project')
        ->withTimestamps();
    }
}
