<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    //
    protected $fillable = ['desc', 'fecha_inicio', 'fecha_fin'];
    public function user(){
        return $this->belongsTo(User::class);
    }
}
