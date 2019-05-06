<?php

use Illuminate\Database\Seeder;

class StationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('stations')->insert([
            [
                'id' => 1,
                'name' => 'TEBSA',
                'latitude' =>-74.76000000,
                'longitude' => 10.93663889,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ], 
            [
                'id' => 2,
                'name' => 'CALAMAR',
                'latitude' =>-74.91166667,
                'longitude' => 10.25386111,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ], 
            [
                'id' => 3,
                'name' => 'TENERIFE',
                'latitude' =>-74.86416667,
                'longitude' => 9.90347222,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],
            [
                'id' => 4,
                'name' => 'PLATO',
                'latitude' =>-74.80666667,
                'longitude' =>9.78842778,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ], 
            [
                'id' => 5,
                'name' => 'MAGANGUE',
                'latitude' =>-74.73861111,
                'longitude' =>9.25402778,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],  
            [
                'id' => 6,
                'name' => 'BARRANCA VIEJA',
                'latitude' =>-74.94861111,
                'longitude' =>10.14833333,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ],
            [
                'id' => 7,
                'name' => 'SAN PEDRITO',
                'latitude' =>-74.90786111111112,
                'longitude' => 10.7515556,
                'state' => 1,
                'icon' => 'river3',
                'created_at' => \Carbon\Carbon::now()->toDateTimeString(),
                'updated_at' => \Carbon\Carbon::now()->toDateTimeString(),
            ], 

        ]);
    }
}
