<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;
use App\Layer;

class UpdateExternalAPIs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'OBS:updateAPIs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update All External APIs';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        //$this->info('Inicio OBS:updateAPIs');
        if(Schema::hasTable('layers')) {
            $layers = Layer::where('sourceType', "realtime")->where('state', 1)
            ->get();
            
            foreach ($layers as $key => $layer) {
                $glSource = json_decode($layer->glSource);
                $glSource->data = $this->toGeoJSON($layer->source);
                $layer->glSource = json_encode($glSource,JSON_UNESCAPED_SLASHES);
                $layer->save();
            }
        }
        //$this->info('Fin OBS:updateAPIs');

    }

    public function toGeoJSON($url){
        try {

            //NOTAS: se define como latitud: lat, longituf: lon
            //converrit cualquier variante en lat lon
            $unwanted_array = array("latitud"=>"lat", "Latitud"=>"lat",
                                    "latitude"=>"lat", "Latitude"=>"lat", 
                                    "longitud"=>"lon", "Longitud"=>"lon", 
                                    "longitude"=>"lon", "Longitude"=>"lon",
                                    "Long"=>"lon", "long"=>"lon");
            $json = file_get_contents($url);
            $original_data = json_decode(strtr( $json, $unwanted_array ), true);
            $features = array();
            foreach($original_data as $key => $items) { 
                $feature =  (object) [
                    "type" => "Feature",
                    "geometry" => [
                        "type" => "Point", 
                        "coordinates" => [0 => (float)$items["lon"],
                                          1 => (float)$items["lat"]
                        ]
                    ]
                ];
                //Convertir los demas elementos en array de propiedades
                foreach($items as $key => $item) { 
                    $feature->properties[$key] = $item;       
                }   
                $features[] =  $feature;
            };
            $allfeatures = array("type" => "FeatureCollection", "features" => $features);
            return $allfeatures;
        } catch (\Throwable $th) {
            return response()->error(  
                 "\nMessage: " . $th->getMessage()
             );
        }

    
    }
}
