<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    public function results()
    {
        return $this->belongsTo(Result::class, "result_id", "id");
    }
    public function budgetproducts()
    {
        return $this->hasMany(BudgetProduct::class);
    }
    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }
    // Booking model
    public function budgets()
    {
      return $this->belongsToMany('App\Budget' ,'budget_product', 'product_id', 'budget_id');
    }
}
