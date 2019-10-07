<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('station_id')->unsigned()->index();
            $table->integer('column_id')->unsigned()->index();

            $table->foreign('station_id')->references('id')->on('stations')->onDelete('cascade');
            $table->foreign('column_id')->references('id')->on('columns')->onDelete('cascade');

            $table->string('file_path');
            $table->string('icon');
            $table->string('name');
            $table->string('active');

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
        Schema::drop('files');
    }
}
