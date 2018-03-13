<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    //
    public function city()
    {
        return $this->belongsTo(City::class, "city_id", "id");
    }
}
