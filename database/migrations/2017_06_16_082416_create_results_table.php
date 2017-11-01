<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('results', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('project_id')->unsigned();
            $table->string('titulo');
            $table->string('indicador');
            $table->string('indicador_file');
            $table->string('meta');
            $table->string('fuenteverificacion');
            $table->string('estado');
            $table->string('progress')->nullable();
            $table->date('fecha_inicio');
            $table->boolean('checkEmpresario');
            $table->boolean('checkAsesor');
            $table->string('fuente_file')->nullable();
            
            $table->date('fecha_inicio');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');

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
        Schema::drop('results');
    }
}
