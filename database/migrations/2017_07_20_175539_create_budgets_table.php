<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBudgetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('budgets', function (Blueprint $table) {
         $table->increments('id');
            $table->string('titulo');
            $table->string('desc');
            $table->integer('tipo_financiamiento')->nullable();//empres, sena,
            $table->integer('porcentaje_maximo');
            $table->integer('porcentaje_minimo');
            $table->string('icon');
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
        //
    }
}
