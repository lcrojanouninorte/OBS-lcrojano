<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
     //
	 public function budgetproducts()
		{
		    return $this->hasMany('App\BudgetProduct');
		       
		}

}
