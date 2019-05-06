<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSensorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('sensors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('station_id')->unsigned()->index();
            $table->foreign('station_id')->references('id')->on('stations')->onDelete('cascade');
            $table->string('stream');
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
        Schema::drop('posts');
    }
}
