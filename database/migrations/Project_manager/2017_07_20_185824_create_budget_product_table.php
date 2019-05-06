<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBudgetProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('budget_product', function (Blueprint $table) {
            //
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('product_id')->unsigned()->index();
            $table->integer('budget_product')->unsigned()->index();
            $table->string('descripcion');
            $table->string('unidad');
            $table->integer('cantidad');
            $table->integer('valor_unitario');
            $table->integer('financiacion_sena');
            $table->integer('c_especie');
            $table->integer('c_efectivo');
            $table->string('estado');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('budget_product_id')->references('id')->on('budget_product')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('budget_product', function (Blueprint $table) {
            //
        });
    }
}
