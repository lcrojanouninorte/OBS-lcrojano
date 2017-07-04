<?php

use Illuminate\Database\Seeder;

class SurveysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('surveys')->delete();
        DB::table('surveys')->insert([
            'id' => 1,
            'desc' => 'Mindex',
            'fecha_activacion' => '2017-06-29',
            'activo' => true,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
        ]);
        DB::table('surveys')->insert([
            'id' => 2,
            'desc' => 'Perfil de Innovación',
            'fecha_activacion' => '2017-06-29',
            'activo' => true,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
        ]);
        DB::table('surveys')->insert([
            'id' => 3,
            'desc' => 'Test de Empatia',
            'fecha_activacion' => '2017-06-29',
            'activo' => true,
            'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
        ]);
    }
}
