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
        return $this->belongsTo('App\User', "user_id", "id");
    }

    public function projects()
    {
        return $this->belongsTo('App\Project', "project_id", "id");
    }
}
