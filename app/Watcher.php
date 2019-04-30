<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Watcher extends Model
{
    //
    public function bot()
    {
        return $this->belongsTo('App\Bot', "bot_id", "id");
    }


}
