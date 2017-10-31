<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    //
    public function products()
    {
        return $this->belongsTo('App\Product', "product_id", "id");
    }

    public function budgetproducts()
    {
        return $this->belongsTo('App\BudgetProduct', "budget_product_id", "id");
    }
}
