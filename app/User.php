<?php

// use Illuminate\Foundation\Auth\User as Authenticatable;

namespace App;

use Bican\Roles\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use Bican\Roles\Traits\HasRoleAndPermission;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Database\Eloquent\Model;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract, HasRoleAndPermissionContract
{
    use Authenticatable, CanResetPassword, HasRoleAndPermission;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'oauth_provider_id', 'oauth_provider',
    ];

    public function projects()
    {
        return $this->hasMany(Project::class)->orderBy('updated_at', 'desc');
    }
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
    public function challenges()
    {
        return $this->hasMany(Challenge::class);
    }
    public function projectsuser()
    {
        return $this->hasMany(ProjectUser::class);
    }
}
