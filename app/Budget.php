<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
     //
    public function budgetproducts()
    {
           return $this->hasMany('App\BudgetProduct', 'budget_id', 'id');
    }

    public function wallets()
    {
        return $this->hasManyThrough('App\Wallet', 'App\BudgetProduct');
    }
}
