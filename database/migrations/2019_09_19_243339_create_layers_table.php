<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLayersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('layers', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->string('category_id');
            $table->string('name');
            $table->string('source');
            $table->string('sourceType');
            $table->string('icon');
            $table->boolean('state');
            $table->string('glSource');
            $table->string('glLayers');
            $table->string('state');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

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
        Schema::drop('layers');
    }
}
