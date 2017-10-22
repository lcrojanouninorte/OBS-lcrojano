<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Contracts\Validation\Validator;

use App\Http\Requests;

use App\Wallet;


use Auth;

class WalletController extends Controller
{
    //




    public function store(Request $request)
    {
        $this->validate($request, [
            'desc' => 'required',
            'cantidad' => 'required',
            'product_id' => 'required',
            'budget_id' => 'required',
            'user_id' => 'required',
        ]);

        $wallet = new Wallet;
        $wallet->desc = $request->input('desc');
        $wallet->cantidad = $request->input('cantidad');
        $wallet->product_id = $request->input('product_id');
        $wallet->budget_id = $request->input('budget_id');
        $wallet->user_id = $request->input('user_id');

        $wallet->save();
        return response()->success(compact('wallet'));
    }


    public function walletList($user_id, $product_id, $budget_id)
    {
        $wallets = Wallet::where("user_id", $user_id)
                        ->where("product_id", $product_id)
                        ->where("budget_id", $budget_id)
                        ->get();
        return response()->success(compact('wallets'));
    }
}
