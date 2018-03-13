<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    //

    public function bots()
    {
        return $this->hasMany(Bot::class);
    }

}
