<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    //
    public function stations()
    {
        //return $this->hasMany(File::class, 'column_id', 'id');         
        //return $this->hasManyThrough(File::class, Station::class);
         
            return $this->belongsToMany(Station::class, 'files', 'column_id', 'station_id')->withTimestamps();;


    }

    public function files()
    {
        return $this->hasMany(File::class);


    }

  

}
