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
    //

   //
   public function watcher()
   {
       return $this->hasMany('App\Watcher', "bot_ref", "id");
   }

}
