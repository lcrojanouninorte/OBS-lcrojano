<!doctype html>
<html ng-app="app">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

    <link rel="stylesheet" href="{!! elixir('css/final.css') !!}">
    <link rel='stylesheet' type='text/css' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic'>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">

        <link rel="stylesheet" href="http://anijs.github.io/lib/anicollection/anicollection.css">




    
<!--Material Icons:-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">



    <title>Plataforma Río Magdalena </title>
    <!-- DESARROLLADO POR LUIS ROJANO -->
    <!-- @mail: lcrojano@gmail.com -->
    <!-- @web: lcrojano.com -->
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!--Mapboxgl js-->

    <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.0/mapbox-gl.js"></script>
    <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.0/mapbox-gl.css" rel="stylesheet" />

    
    <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.0.1/mapbox-gl-geocoder.css">
    <script src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v2.0.1/mapbox-gl-geocoder.js"></script>

</head>
<body  route-bodyclass class="sidebar-collapse skin-blue-light ">
    <div class="wrapper" >
        <div   ui-view="layout"></div>
        <div class="control-sidebar-bg"></div>
    </div>
    <script src="{!! elixir('js/final.js') !!}" async defer></script>
     <!-- Mobile Date Picker-->


 
 
     <!--<canvas id="canvas" width="1000" height="1000">your canvas loads here</canvas>-->

    <script type='text/javascript' src="//unpkg.com/css-element-queries@^0.4.0/src/ElementQueries.js"></script>
    <script type='text/javascript' src="//unpkg.com/css-element-queries@^0.4.0/src/ResizeSensor.js"></script>
   <script>
        /*test raster
        var canvas=document.getElementById("canvas");
        var context=canvas.getContext('2d');
        var image=new Image();
        image.onload=function(){
        context.drawImage(image,0,0,canvas.width,canvas.height);
        };
        image.src="files/shares/plataforma/LAYERS/test_0.png";
*/
    </script>

</body>
</html>
