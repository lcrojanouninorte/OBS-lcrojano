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
        $currenttime = date('h:i:s:u');
        //echo(Schema::hasTable('layers'));
        sleep(58); //esto con el fin de actualizar 58 segundo antes de que actualize la api origen
        //Este cron corre cada minuto, mas un delay de 58 segundos, es decir que relamente sera cada 58 segundos.
        if(Schema::hasTable('layers')) {
            $layers = Layer::where('sourceType', "realtime_icons")->where('state', 1)
            ->get();
                    if($layers){
                        
                        foreach ($layers as $key => $layer) {
                            echo("[$currenttime] layer_id: ".$layer->id);

                            $glSource = json_decode($layer->glSource);
                            $glSource->data = $this->toGeoJSON($layer->source);
                            $layer->glSource = json_encode($glSource,JSON_UNESCAPED_SLASHES);
                            if($layer->save()){
                                echo("[$currenttime] layer_id: $layer->id.  updated");
            
                            };
                        }
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
