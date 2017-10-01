<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BudgetProduct extends Model
{
    //
    protected $table = 'budget_product';

        public function budgets_desc()
		{
		    return $this->belongsTo('App\Budget', "budget_id", "id");
		      
		}

		    public function products()
		{
		    return $this->belongsTo('App\Product',"product_id", "id");
		}

		  	
}
