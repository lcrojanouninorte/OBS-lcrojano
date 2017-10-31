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
            'budget_product_id' => 'required',
            'user_id' => 'required',
        ]);

        $wallet = new Wallet;
        $wallet->desc = $request->input('desc');
        $wallet->cantidad = $request->input('cantidad');
        $wallet->product_id = $request->input('product_id');
        $wallet->budget_product_id = $request->input('budget_product_id');
        $wallet->user_id = $request->input('user_id');

        $wallet->save();
        return response()->success(compact('wallet'));
    }


    public function walletList($user_id, $product_id, $budget_product_id)
    {
        $wallets = new \stdClass();
        ;
        $wallets_data = Wallet::where("user_id", $user_id)
                        ->where("product_id", $product_id)
                        ->where("budget_product_id", $budget_product_id)
                        ->get();
        $wallet_total = 0;
        foreach ($wallets_data as $key => $wallet) {
            $wallet_total+=$wallet->cantidad;
        }
        $wallets->total = $wallet_total;
        $wallets->wallets= $wallets_data;
        return response()->success($wallets);
    }
}
