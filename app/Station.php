<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Station extends Model
{

    public function files()
    {
        return $this->hasMany(File::class);


    }

    public function columns()
    {
        //return $this->hasMany(File::class, 'column_id', 'id');         
        //return $this->hasManyThrough(File::class, Station::class);
         
            return $this->belongsToMany(Column::class, 'files', 'column_id', 'station_id')->withTimestamps();;

    }

}
