<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('result_id')->unsigned();
            $table->string('desc');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->string('duracion')->nullable();
            $table->string('progress')->nullable();
            $table->string('estado')->nullable();
            $table->boolean('checkEmpresario');
            $table->boolean('checkAsesor');
            $table->timestamps();

            $table->foreign('result_id')->references('id')->on('results')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('products');
    }
}
