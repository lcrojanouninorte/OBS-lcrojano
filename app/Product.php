<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    public function results(){
        return $this->belongsTo(Result::class, "result_id", "id");
    }
    public function budgetproducts(){
        return $this->hasMany(BudgetProduct::class);
    }
}
