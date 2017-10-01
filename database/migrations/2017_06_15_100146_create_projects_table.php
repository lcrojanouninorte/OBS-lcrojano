<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string('titulo');
            $table->string('estado')->nullable();
            $table->string('progress')->nullable();
            $table->string('desc');
            $table->string('plant_prob')->nullable();;
            $table->string('estado_arte')->nullable();;
            $table->string('ob_general')->nullable();;
            $table->string('result_empleo')->nullable();;
            $table->integer('duracion')->nullable();
            $table->string('lugar')->nullable();//lugar de ejecucion
            $table->integer('process_id')->unsigned()->nullable();;//convocatoria
            $table->integer('entity_id')->unsigned()->nullable();//entidad ejecutora
            $table->integer('asesor')->unsigned()->nullable();//usuario administrador del proyecto
            $table->integer('user_id')->unsigned();//Creador del proyecto
            $table->date('fecha_inicio');//Creador del proyecto
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
           // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('projects');
    }
}
