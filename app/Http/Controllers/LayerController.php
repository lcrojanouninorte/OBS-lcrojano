<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Layer;

use Auth;

use App\Category;

use App\Log;

use DB;

use Avatar;

use Storage;

// Import classes
use Shapefile\Shapefile;
use Shapefile\ShapefileException;
use Shapefile\ShapefileReader;




class LayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $layers = Layer::get()->groupBy('category_id');
        return response()->success(compact('layers'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //

        $user = Auth::user();
        $this->validate($request, [
        'name' => 'required',
        'category_id' => 'required',
        'sourceType' => 'required',

         ]);


        try {
            $layer = [];
            $layer = new Layer;
                $log = new Log;
                $log->desc = "User ($user->id, $user->name): ADD  ";
                $log->user_id = $user->id;
                $log->table = "layers";
            //add or update layer
            if($request->has('id')){
                $layer =  layer::find($request->input('id'));
                $log->desc = "User ($user->id, $user->name): UPDATE  ";
                $layer->state =  $request->input('state') ;
                
               // return response()->error($request->input('state'));  

            }
            //Id antes de salvar
            if(!$layer->id){
                $tempId =  $this->getNextId('layers');
                $layer->id = $tempId;
                $layer->name = trim($request->input('name'));
                $layer->category_id = $request->input('category_id');
                $layer->state = false;

                $layer->sourceType = $request->input('sourceType');
                $layer->icon = "layer.svg";
                
                //Save file and get local source (when is file)

                if($request->hasFile('file') ){
                    $file  = $request->file('file');
                    //PASO 1: descargar el archivo ZIP en el folder 
                    //Guardaremos en Layers/Category/layer/file.geojson
                    $destinationPath = "";
                    $fileCompleteName = $file->getClientOriginalName();
                    $fileName = explode(".", $fileCompleteName)[0];
                    $extension = explode(".", $fileCompleteName)[1];
                    $category = Category::find($layer->category_id);
                    $cat_name = $category->name;
                    $layer_name = $layer->name;
                    $unwanted_array = array(    'Š'=>'S', 'š'=>'s', 'Ž'=>'Z', 'ž'=>'z', 'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
                            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O', 'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U',
                            'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss', 'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c',
                            'è'=>'e', 'é'=>'e', 'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o', 'ô'=>'o', 'õ'=>'o',
                            'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'þ'=>'b', 'ÿ'=>'y' );
                    $cat_name = strtr( $cat_name, $unwanted_array );
                    $layer_name = strtr( $layer_name, $unwanted_array );
                    $destinationPath = "LAYERS/$cat_name/$layer_name/"; //./relative to mapbox
                    $file_saved = Storage::disk('plataforma')->put(
                        $destinationPath.$fileCompleteName,
                        file_get_contents($file->getRealPath())
                    );
                    $layer->source = $destinationPath.$fileName.".".$extension;   
                }
                
                //Crear glLayer y glSource para no sobrecargar al cliente
                //GLSOURCE
                $glSource = (object) [
                    "id"    => 'Source'.$layer->id,
                    "type"  => "geojson"
                ];
                $jsonString ="";

                switch ($layer->sourceType) { //Obtener el paraetro Data (URL, FIle o gejson creado)
                    case 'file':

                        $glSource->data = './files/shares/plataforma/'.$layer->source;
                        $disk_path = Storage::disk('plataforma')->getAdapter()->getPathPrefix();
                        $jsonString = file_get_contents($disk_path.'/'.$layer->source);

                        break;
                    case 'url':
                        $layer->source = $request->input('url'); 
                        $glSource->data = $layer->source;
                        $jsonString = file_get_contents($layer->source);
                        break;
                    case 'realtime':
                        $layer->source = $request->input('url'); 
                        $glSource->data = $this->toGeoJSON($layer->source);
                        $jsonString = json_encode($glSource->data);
                        //Create cron job
                        
                        break;
                    
                    default:
                        # code...
                        break;
                }
                //return response()->error()
                $layer->glSource = json_encode($glSource,JSON_UNESCAPED_SLASHES);
                //GLLAYERS
                //Buscamos caso estandar: features->geometry->type en el geojson obtenido
                $geoJson = json_decode($jsonString, true);
                $geoTypes = [];
                $geoLayers = [];
                    foreach ($geoJson['features']  as $key => $feature) {
                        if($feature["geometry"]["type"] == "GeometryCollection") {
                            //pero puede ser caso especial de geometries
                            foreach ($feature["geometry"]['geometries']  as $key => $geometry) {
                                if(!in_array($geometry["type"], $geoTypes) ){
                                    $layerStyle = $this->getGeoTypesStyles($geometry, $layer, $feature);
                                    array_push($geoTypes,$geometry["type"]);
                                    array_push($geoLayers,$layerStyle);
                                }
                            }
                        }else{

                            if(!in_array($feature["geometry"]["type"], $geoTypes) ){
    
                                $layerStyle = $this->getGeoTypesStyles($feature["geometry"], $layer,$feature);
                                array_push($geoTypes,$feature["geometry"]["type"]);
                                array_push($geoLayers,$layerStyle);
                            }
                        }
                    }
                
                $layer->glLayers =  json_encode($geoLayers, JSON_UNESCAPED_SLASHES);
        }
            
            if($layer->save()){
                $log->table_id = $layer->id;
                $log->desc = $log->desc." Layer ($layer->id, $layer->name).";
                $log->save();
            }

 
        } catch (Exception $e) {
                return response()->error(  
                "Error Type: "  . $e->getErrorType()
                . "\nMessage: " . $e->getMessage()
                . "\nDetails: " . $e->getDetails()
            );
        }
        
        return response()->success(compact('layer'));

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

    public function getGeoTypesStyles($geometry, $layer,$feature){
        $geoStyles =[];
        //background, fill, line, symbol, raster, circle, fill-extrusion, heatmap, hillshade.
        //https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers    

        //echo($geoType);
        $geoType = $geometry["type"];
       // $target = $geometry["coordinates"];

        switch ($geoType) {
            case "MultiPoint":
            case "Point": 
            //TODO: verificar caso en el que hay un circulo en ves de un marcador
            //TODO: verificar caso heatmap

            $style =  (object) [ //Basic
                "layer_id" => $layer->id,
                "id" => "Layer".$geoType.$layer->id,
                "source"  =>"Source".$layer->id,
                "filter"  => ["==", "\$type", $geoType]
            ];
                    //Crear layout segun pripiedades comunes:
                    //Name, Icon
                    $layout =  [
                        "visibility" => "visible"
                    ];

                    if(!array_key_exists("properties",$feature)){
                        $feature["properties"] = ["name"=>"point"];
                    }
                    if(array_key_exists("icon", $feature["properties"])){
                        $layout["icon-size"] = 0.25;
                        $layout["icon-image"] = $feature["properties"]["icon"];
                        $style->type ="symbol";
                        if(array_key_exists("name", $feature["properties"])){
                            $layout["text-field"] = "{".$feature['properties']['name']."}";
                        }
                    }else{
                        $style->type="circle";
                        $style->paint = [
                            'circle-radius'=> 5,
                            'circle-color'=> '#088',
                            'circle-opacity'=> 0.7,
                            'circle-stroke-width'=> 2,
                            'circle-stroke-color'=> '#887'
                        ];
                    }

                    $style->layout=$layout;
                    return $style;
                break;
                
            case "MultiLineString":
            case "LineString":
                return  [
                        "layer_id" => $layer->id,
                        "id" => "Layer".$geoType.$layer->id,
                        "source"  =>"Source".$layer->id,
                        "type" => "line",
                        "paint" => [
                            "line-color" => "#BF93E4",
                            "line-width" => 2
                        ],
                        "layout" => [
                            "line-join"=> "round",
                            "line-cap"=> "round",
                            "visibility"=> "visible"
                        ],
                        "filter"  => ["==", "\$type", "LineString"] //Revisar si incluir multiline string
                    ];
                break;
                      
            case "MultiPolygon":
            case "Polygon":
            //LinearRing 
                return  [                        
                    "layer_id" => $layer->id,
                    "id" => "Layer".$geoType.$layer->id,
                    "source"  =>"Source".$layer->id,
                    "type" => "fill",
                    "paint" => [
                        "fill-color" => "#088",
                        "fill-outline-color" =>"#883",
                        "fill-opacity"=> 0.6,
                    ],
                    "layout" => [
                        "visibility"=> "visible"
                    ],
                "filter"  => ["==", "\$type", $geoType]
            ];
                break;
            default:
                # code...
                break;
        }          
    }

    public function getNextId($tableName)
    {
        $statement = DB::select("SHOW TABLE STATUS LIKE '$tableName'");
        return $statement[0]->Auto_increment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $layer = Layer::find($id);
        return response()->success($layer);
        //
             /*
CODIGO PARA UNZIP Y ENCONTRAR UN ARCHIVO ZIP RAP COMPRIMIDO
                    //PASO 2: Unzip
                    $output=""; 
                    $return="";
                    $pid ="";
                    $storage_path = Storage::disk('plataforma')->getAdapter()->getPathPrefix();
                    $final_path = $storage_path.$destinationPath;
                    switch ($extension && $file_saved) {
                        case 'zip':
                        $pid = exec("unzip -o $final_path/$fileName.$extension -d $final_path", $output, $return);
                        if (!$return) {
                            exec("kill -9 $pid");
                        }
                            break;
                        case 'rar':
                        exec("unrar x $final_path -d $final_path");
                            break;                 
                        default:
                            # code...
                            break;
                    }
                     
                    //Paso 3: convert to geoJson
                    // list all filenames in given path
                    $allFiles = Storage::disk('plataforma')->files($destinationPath);
                    // filter the ones that match the filename.* 
                    $matchingFiles = preg_grep('/^.*\.shp$/', $allFiles);
                    // iterate through files and echo their content
                    //solo  el primer archivo
                    

                    foreach ($matchingFiles as $path) {
                        
                        $shape_file_path = $path;
                      
                    }
                    */
 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
  
        $user = Auth::user();

        $layer = Layer::find($id);
        //Di categoria es 1, es decir sensor en tiempo real no borrar, 
        
        //Delete folder and files
        if($layer->delete()){
            $log = new Log;
            $log->desc = "($user->id, $user->name): DELETE category ($layer->id, $layer->name).";
            $log->user_id = $user->id;
            $log->table = "layers";
            $log->table_id = $layer->id;
            $log->save();
        }

    
 
        return response()->success('success');
    }
}
