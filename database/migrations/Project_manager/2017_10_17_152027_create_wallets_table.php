<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWalletsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('wallets', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('user_id')->unsigned()->index();
            $table->integer('product_id')->unsigned()->index();
            $table->integer('budget_product_id')->unsigned()->index();
            $table->string('desc');
            $table->string('tipo');
            $table->string('doc')->nullable();
            $table->integer('cantidad');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('budget_product_id')->references('id')->on('budget_product')->onDelete('cascade');
           
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('wallets');
    }
}
