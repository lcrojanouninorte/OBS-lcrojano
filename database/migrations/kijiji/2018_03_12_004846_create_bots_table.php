<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bots', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username');
            $table->string('password'); //change for more secure
            $table->string('city_id')->references('id')->on('cities')->onDelete('cascade');  
            $table->integer('ads_limit');
            $table->integer('minutes');
            $table->integer('start');
            $table->integer('end');
            $table->boolean('active');
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
        Schema::drop('bots');
    }
}
