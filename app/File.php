<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    //
    public function stations()
    {
            return $this->belongsTo(Station::class, 'station_id', 'id');
     }
    //
    public function columns()
    {
        return $this->belongsTo(Column::class);
    }
}
