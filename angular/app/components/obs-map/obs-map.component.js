class ObsMapController {
    constructor(API, AclService, $auth, $log, $compile, $scope, $mdDialog, $mdSidenav, lightbox, $timeout, Upload, $window, mapboxglMapsData, $interval, $state, joyrideService, $http, ContextService) {
        'ngInject';

        //
        this.API = API
        this.$http = $http
        this.isLogged = $auth.isAuthenticated()
        this.ContextService = ContextService
        this.$state = $state
        this.map = null
        this.$auth = $auth
        this.mapboxglMapsData = mapboxglMapsData
        this.$log = $log
        this.$timeout = $timeout
        this.$interval = $interval
        this.$window = $window
        this.Upload = Upload
        this.can = AclService.can
        this.$compile = $compile
        this.$scope = $scope
        this.$mdDialog = $mdDialog
        this.$mdSidenav = $mdSidenav
        this.lightbox = lightbox
        this.stations = {}
        this.markers = {}
        this.glMarkers = []
        this.glSources = [] //contendra el geojson de cada capa
        this.glLayers = [] //contendra cada capa
        this.glLayersNames = [] //contiene nombres de las capas para filtrar en onclick map
        this.glApiLayers = [] //contine capas tipo API  las cuales se cargarán como markers
        this.glStyle = 'mapbox://styles/mapbox/basic-v8'
        this.categories = {}
        this.glControls = {
            geocoder: {
                enabled: true,
                options: {
                    position: 'top-right',
                    accessToken: mapboxgl.accessToken
                }
            },
            navigation: {
                enabled: true,
                options: {
                    position: 'top-left'
                }
            },
            scale: {
                enabled: true,
                options: {
                    position: 'bottom-left'
                }
            },
            attribution: {
                enabled: true,
                options: {
                    position: 'bottom-right',
                    customAttribution: "contributors/ OBSRIOMAGDALENA.CO - Plataforma de Monitoreo del Río Magdalena"
                }
            },
            geolocate: {
                enabled: true,
                options: {
                    position: 'top-left'
                }
            },
            custom: [{
                    constructor: this.CustomControl,
                    name: 'CustomControl1',
                    options: {
                        position: 'top-left'
                    },
                    events: ['buttonClick']
                },
                /* {
                     constructor: this.CustomControl2,
                     name: 'CustomControl2',
                     options: {
                         position: 'top-left'
                     },
                     events: ['buttonClick']
                 },*/
                {
                    constructor: this.CustomControl3,
                    name: 'CustomControl3',
                    options: {
                        position: 'top-left'
                    },
                    events: ['buttonClick']
                }
            ]

        }
        this.showStyles = false
        this.perspective_2d = false;
        this.glMaxBounds = [
            [-75, 9.9], // Southwest coordinates
            [-76, 9.9] // Northeast coordinates
        ];
        let Stations = this.API.all('stations');
        Stations.getList().then((response) => {
            if (response.error) {
                $log.debug(response);
            } else {
                let stations = response.plain()
                let i = 0
                for (i = 0; i < stations.length; i++) {
                    let station = stations[i];
                    let marker = {
                        coordinates: [station.latitude, station.longitude],
                        element: this.createElement(
                            station
                        ),
                        options: {
                            anchor: 'bottom'
                                //  offset: [0, 5]

                        }, // Optional --> https://www.mapbox.com/mapbox-gl-js/api/#Marker
                        popup: {
                            enabled: false,
                            options: {
                                offset: 25
                            }, // Popup options --> https://www.mapbox.com/mapbox-gl-js/api/#Popup
                            message: station.name,
                            // getScope: Function, // Default $rootScope
                            onClose: function(event, popupClosed) {
                                // ...
                            }
                        }
                    }

                    this.glMarkers.push(marker)
                }

            }
        })

        this.joyride = joyrideService;
        this.joyride.start = false;
        let openSidenav = this.openSidenav
        this.joyride.config = {
            overlay: false,

            steps: [{

                    title: "Bienvenido",
                    content: "<p>Bienvenidos al visor del Río Magdalena!</p><p> A continuación podrá observar las opciones que tiene disponible.</p>"
                },
                {
                    type: 'element',
                    selector: '#md-fab-layers',
                    placement: 'right',
                    title: 'Capas',
                    content: '<p>Al dar clic aquí, puede seleccionar entre las distintas capas disponibles.</p> '

                },
                {
                    type: 'element',
                    selector: '.md-sidenav-left',
                    placement: 'right',
                    title: 'Capas',
                    content: '<p>En este menú puede obsercar categorias y dentro de ellas capas que puede seleccionar para visualizar sobre el mapa.</p> ',
                    beforeStep: openSidenav

                },
                {
                    type: 'element',
                    selector: '.mapboxgl-ctrl-group',
                    placement: 'right',
                    title: 'Control del Mapa',
                    content: '<p>Controle el Zoom y el ángulo de  rotación del Mapa</p> ',

                },
                {
                    type: 'element',
                    selector: '.mapboxgl-ctrl-geolocate',
                    placement: 'right',
                    title: 'Encuentra tu posicion',
                    content: '<p>Encuentra tu posición actual con base en su IP</p> '
                },
                {
                    type: 'element',
                    selector: '.mapboxgl-ctrl-icon-layers',
                    placement: 'right',
                    title: 'Tipo de Mapa',
                    content: '<p>Puede elegir entre varios tipos de mapa al dar clic en este icono</p> '
                }

            ]
        }

    }

    openSidenav() {
        let joyride = this.joyride
        this.toggleSidenav().then(function() {
            joyride.resumeJoyride();
        });

    }
    customNext() {
        this.joyride.next();
    }

    go(index) {
        this.joyride.goTo(index)
    }

    startJoyride() {
        //console.log(true);
        this.joyride.start = true;
    }

    //CUSTOM CONTROL FOR CHANGE MAPS STYLEs
    CustomControl(options) {
        this.options = this.options || {};
        angular.extend(this.options, options);
    }
    CustomControl2(options) {
        this.options = this.options || {};
        angular.extend(this.options, options);
    }
    CustomControl3(options) {
        this.options = this.options || {};
        angular.extend(this.options, options);
    }

    $onInit() {
        this.toggleSidenav = this.buildToggler('closeEventsDisabled');
        let Category = this.API.all('categories');
        let glLayers = this.glLayers
        let glLayersNames = this.glLayersNames
        let glSources = this.glSources
        let vm = this
            //let $timeout = this.$timeout
        Category.getList()
            .then((response) => {
                this.categories = response.plain()
                angular.forEach(this.categories, function(category) {
                    category.hide = true
                    angular.forEach(category.layers, function(layer) {
                        if (layer.glSource != null && layer.glLayers != null) {
                            let jsonGlLayers = JSON.parse(layer.glLayers)
                            angular.forEach(jsonGlLayers, function(glLayer) {
                                //Si se ha elegido cargar un API con iconos precargados

                                //TODO: Si el api es con iconos, o si es solo puntos.
                                if (glLayer.type == "symbol") {
                                    //Si es tipo API (symbol) guardar para luego, cuando el mapa esta cargado, colocarlos en el mapa y hacer update periodico
                                    vm.glApiLayers.push(layer)
                                } else {
                                    //Normal layer 
                                    if (layer.state == false) {
                                        if (angular.isUndefined(glLayer.layout)) {
                                            glLayer.layout = { "visibility": "none" }
                                        } else {
                                            glLayer.layout.visibility = "none"
                                        }
                                    }
                                    glLayers.push(glLayer);
                                    glLayersNames.push(glLayer.id);
                                }
                            });

                        }

                        glSources.push(JSON.parse(layer.glSource));

                    });
                });
            })

        this.$scope.$on('mapboxglMap:load', function(event, mapboxglMapEvent) {
            event.currentScope.vm.map = event.currentScope.vm.mapboxglMapsData.getMapById('obsMap');
            event.currentScope.$apply();
            let tglLayers = event.currentScope.vm.glLayers
            let tglSources = event.currentScope.vm.glSources
            let currentScope = event.currentScope

            //Al Cambiar de stilo se debe volver a cargar las capas activas
            event.currentScope.vm.map.on('style.load', function(obj) {
                //Capas glLayer
                currentScope.vm.glSources = []
                currentScope.vm.glLayers = []
                currentScope.$apply();

                currentScope.vm.glSources = tglSources
                currentScope.vm.glLayers = tglLayers
                currentScope.$apply();

            });
            //Cargar capas tipo API si las hay, y update cada minuto
            //Estas fueron filtradas al cargar Category
            angular.forEach(vm.glApiLayers, function(layer, key) {
                    vm.updateMarkers(layer, vm);
                    let interval = vm.$interval(function() {
                        layer.interval = interval
                        if (layer.state == true) {
                            vm.updateMarkers(layer, vm);
                        }
                    }, 30000);

                })
                //actualizar sensores tiempo real

        });

        this.$scope.$on('mapboxglMap:click', function(angularEvent, mapboxglEvent) {

            // Use featuresAt to get features within a given radius of the click event
            // Use layer option to avoid getting results from other layers
            let map = angularEvent.currentScope.vm.map
                // Find all features within a bounding box around a point
            var width = 10;
            var height = 10;
            var features = map.queryRenderedFeatures([
                [mapboxglEvent.point.x - width / 2, mapboxglEvent.point.y - height / 2],
                [mapboxglEvent.point.x + width / 2, mapboxglEvent.point.y + height / 2]
            ], {
                layers: angularEvent.currentScope.vm.glLayersNames
                    // layers:[ "LayerPolygon52", "LayerMulti53", "LayerLineString53",  "LayerPoint76", "LayerMultiLineString77", "LayerLineString54", "LayerPolygon59" ]

            });

            if (features.length) {
                // Get coordinates from the symbol and center the map on those coordinates
                /*map.flyTo({center: features[0].geometry.coordinates[0][0],
                                   // zoom: 9,
                                    bearing: 0,
                                    speed: 0.2, // make the flying slow
                                    curve: 1, // change the speed at which it zooms out
                                    easing: function (t) { return t; }
                          });*/
                //var featureName = features[0].properties.name;
                var text = '<div layout="column" layout-align="center">'
                var hideKyes = ["Shape_Leng", "Shape_Area", "OBJECTID", "featureId"]
                angular.forEach(features[0].properties, function(val, key) {
                    if (hideKyes.indexOf(key) == -1) {
                        text = text + '<p>' + key + ": " + val + '</p>'
                    }

                })
                text = text + '</div>'
                var tooltip = new mapboxgl.Popup()
                    .setLngLat(mapboxglEvent.lngLat)
                    .setHTML(text)
                    .addTo(map);
            }

            // Use the same approach as above to indicate that the symbols are clickable
            // by changing the cursor style to 'pointer'.
            /* map.on('mousemove', function (e) {
               var width = 10;
               var height = 20;
               var features = map.queryRenderedFeatures([
                 [mapboxglEvent.point.x - width / 2, mapboxglEvent.point.y - height / 2],
                 [mapboxglEvent.point.x + width / 2, mapboxglEvent.point.y + height / 2]
               ] );
               if (features.length) {
                map.getCanvas().style.cursor = features.length ? 'pointer' : '';
               }

             });*/

        });

        //FOR CUSTOM CONTROLS INSIDE MAPS

        this.CustomControl.prototype = new mapboxgl.Evented();
        this.CustomControl.prototype.onAdd = function(map) {
            var self = this;
            self.map = map;
            var container = document.createElement('div');
            container.className = 'mapboxgl-ctrl'
            map.getContainer().appendChild(container);

            var buttonContainer = document.createElement('div');
            var button = document.createElement('button');
            button.className = 'mapboxgl-ctrl-icon-layers';
            button.style.height = '30px';
            button.style.width = '30px';
            button.style.borderRadius = '5px';
            button.style.border = 'white';
            button.style['background-color'] = '#FFFFFF';

            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                self.fire('buttonClick', event);
            });
            buttonContainer.appendChild(button);
            container.appendChild(buttonContainer);
            return container;
        }

        this.CustomControl2.prototype = new mapboxgl.Evented();
        this.CustomControl2.prototype.onAdd = function(map) {
            var self = this;
            self.map = map;
            var container = document.createElement('div');
            container.className = 'mapboxgl-ctrl'
            map.getContainer().appendChild(container);
            var buttonContainer = document.createElement('div');
            var button = document.createElement('button');
            button.className = 'mapboxgl-ctrl-icon-help';
            button.style.height = '30px';
            button.style.width = '30px';
            button.style.borderRadius = '5px';
            button.style.border = 'white';
            button.style['background-color'] = '#FFFFFF';

            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                self.fire('buttonClick', event);
            });
            buttonContainer.appendChild(button);
            container.appendChild(buttonContainer);
            return container;
        }

        this.CustomControl3.prototype = new mapboxgl.Evented();
        this.CustomControl3.prototype.onAdd = function(map) {
            var self = this;
            self.map = map;
            var container = document.createElement('div');
            container.className = 'mapboxgl-ctrl'
            map.getContainer().appendChild(container);
            var buttonContainer = document.createElement('div');
            var button = document.createElement('button');
            button.className = 'mapboxgl-ctrl-icon-2d3d';
            button.style.height = '30px';
            button.style.width = '30px';
            button.style.borderRadius = '5px';
            button.style.border = 'white';
            button.style['background-color'] = '#FFFFFF';

            button.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                self.fire('buttonClick', event);
            });
            buttonContainer.appendChild(button);
            container.appendChild(buttonContainer);
            return container;
        }

        this.$scope.$on('mapboxgl:CustomControl1:buttonClick', function(event, controlEvent) {
            event.currentScope.vm.showStyles = !event.currentScope.vm.showStyles
            event.currentScope.$apply();
        })

        this.$scope.$on('mapboxgl:CustomControl2:buttonClick', function(event, controlEvent) {
            event.currentScope.vm.joyride.start = !event.currentScope.vm.joyride.start
            event.currentScope.$apply();
        })

        this.$scope.$on('mapboxgl:CustomControl3:buttonClick', function(event, controlEvent) {
            event.currentScope.vm.perspective_2d = !event.currentScope.vm.perspective_2d
            event.currentScope.vm.change_perspective();

            event.currentScope.$apply();
        })
    }

    updateMarkers(layer, vm) { //viene de un timeout

        let Layers = vm.API.one('layers', layer.id)
            .get().then((response) => {
                if (response.error) {
                    //vm.$log.debug(response);
                } else {
                    let layer = response.data
                        //Borrar los datos anteriores de esta capa
                    for (var j = vm.glMarkers.length - 1; j >= 0; j--) {
                        if (angular.isDefined(vm.glMarkers[j].layerId)) {
                            if (vm.glMarkers[j].layerId == layer.id) {
                                vm.glMarkers.splice(j, 1);
                            }
                        }
                    }
                    vm.addeMarkersToMap(layer, vm)

                    //vm.$log.debug(layer)
                }
            })

    }
    addeMarkersToMap(layer, vm) {
        let glSource = JSON.parse(layer.glSource)
        angular.forEach(glSource.data.features, function(feature) {
            let lon = feature.properties.lon
            let lat = feature.properties.lat
            let icon = feature.properties.icon
            let name = feature.properties.name
            let marker = {
                layerId: layer.id,
                coordinates: [lon, lat],
                element: vm.createElement(
                    feature.properties, layer
                ),
                options: {
                    anchor: 'bottom'
                        //  offset: [0, 5]

                }, // Optional --> https://www.mapbox.com/mapbox-gl-js/api/#Marker
                popup: {
                    enabled: false,
                    options: {
                        offset: 25
                    }, // Popup options --> https://www.mapbox.com/mapbox-gl-js/api/#Popup
                    message: name,
                    // getScope: Function, // Default $rootScope
                    onClose: function(event, popupClosed) {
                        // ...
                    }
                }
            }
            vm.glMarkers.push(marker)

        });
        // vm.$scope.$apply();

    }

    createElement(marker, layer) {
        var el = document.createElement('div');
        //Viene de Layers 
        if (angular.isDefined(layer)) {
            el.className += " " + "layer_" + layer.id;
            if (layer.state == false) {
                el.className += " hide";
            }
            if (layer.sourceType.indexOf("realtime_icons") !== -1) {
                el.className += " " + marker.icon;
                el.setAttribute("ng-click", "vm.show_icon($event," + JSON.stringify(marker) + ");");

            }

        } else {
            //Veine de stations
            el.style.backgroundImage = "url(" + marker.icon + ")"; //Debe ser url o relativo desde puublic
            el.style.backgroundRepeat = "no-repeat";
            el.style.backgroundSize = "cover";
            el.style.cursor = "pointer";
            el.style.width = "35px";
            el.style.height = "35px";
            el.setAttribute("ng-click", "vm.show_station($event," + JSON.stringify(marker) + ");");
        }
        el.innerHTML = "<span class='marker-title'>" + marker.name + "</span>";
        el = this.$compile(el)(this.$scope);

        return el[0];
    }

    showLayer(layer) { //Toggle layer
        let map = this.map
        let glLayers = this.glLayers
        let jsonGlLayer = JSON.parse(layer.glLayers)

        if (layer.state == false) {
            //Desactivar todos los stilos de esta capa      
            //si es API externa //set_visible hide

            if (layer.sourceType == "realtime_icons") {
                let layersEl = document.getElementsByClassName('layer_' + layer.id)
                angular.forEach(layersEl, function(el, key) {
                    el.className += " hide";
                })

            } else {
                //si es Layer Geojson
                for (var i = glLayers.length - 1; i >= 0; i--) {
                    if (glLayers[i].layer_id == layer.id) {
                        map.setLayoutProperty(glLayers[i].id, 'visibility', 'none')
                    }
                }
            }

        }

        if (layer.state == true) {

            if (jsonGlLayer[0].type == "symbol") { //cambiar por API
                //set_visible false
                let layersEl = document.getElementsByClassName('layer_' + layer.id)
                angular.forEach(layersEl, function(el, key) {
                    el.classList.remove("hide");

                })
            } else {

                if (layer.glLayers != null && this.map != null) {
                    for (var j = glLayers.length - 1; j >= 0; j--) {
                        if (glLayers[j].layer_id == layer.id) {
                            map.setLayoutProperty(glLayers[j].id, 'visibility', 'visible')
                                //target = glLayers[j].target;
                        }
                    }
                    //this.fly_to_location(target)
                }
            }

        }

        //Editar capa a 1 o 0 solo si esta logueado y puede administrar capas y no es delete
        if (this.$auth.isAuthenticated()) {
            if (this.can("manage.layers")) {
                if (angular.isDefined(this.editLayer) && !layer.deleted && !layer.saved) {
                    this.editLayer(layer);
                }
            }
        } else {
            //O colocar un popup
            //this.$state.go("login")
        }

    }

    setLayerSource(layerId, source, sourceLayer) {
        const oldLayers = map.getStyle().layers;
        const layerIndex = oldLayers.findIndex(l => l.id === layerId);
        const layerDef = oldLayers[layerIndex];
        const before = oldLayers[layerIndex + 1] && oldLayers[layerIndex + 1].id;
        layerDef.source = source;
        if (sourceLayer) {
            layerDef['source-layer'] = sourceLayer;
        }
        this.map.removeLayer(layerId);
        this.map.addLayer(layerDef, before);
    }

    show_station(ev, marker) {

        let $log = this.$log
        $log.debug(marker)
        this.$mdDialog.show({
                locals: { station: marker, category: null }, //We use same controller for all modal in this page.
                controller: this._DialogController,
                templateUrl: 'station-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $log.debug('You said the information was "' + answer + '".');
            }, function() {
                $log.debug('You cancelled the dialog.');
            });
    }
    show_icon(ev, icon) {
        this.$mdDialog.show({
                locals: { station: icon, category: null }, //We use same controller for all modal in this page.
                controller: this._DialogController,
                templateUrl: 'icon-dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: true // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                $log.debug('You said the information was "' + answer + '".');
            }, function() {
                $log.debug('You cancelled the dialog.');
            });
    }

    //General Add Item in nav, category or layer
    //For layer, we need his Category parent. 
    add_nav_item(ev, type, category) {
        category = angular.isDefined(category) ? category : null;

        let $log = this.$log
        let API = this.API
        let categories = this.categories
        let editCategory = this.editCategory
        let editLayerUploader = this.editLayerUploader
        let $timeout = this.$timeout
        let $window = this.$window
        let Upload = this.Upload
        let showLayer = this.showLayer
        let $state = this.$state
        let vm = this

        let tpl = type == "category" ? "add-category-dialog.html" : "add-layer-dialog.html"

        this.$mdDialog.show({
            locals: {
                station: null, //no para esta funcion
                category: category
            },
            controller: this._DialogController,
            templateUrl: tpl,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            //CALLBACK WHEN USER CLIC ON SAVE IN CREATE NAV ITEM MODAL
            $log.debug('You said the information was "' + answer + '".');
            switch (answer.type) {
                case "category":
                    editCategory(answer, categories, API, $log, $state)
                    break;
                case "layer":
                    editLayerUploader(answer, vm)
                    break;
                default:
                    break;
            }
        }, function() {
            $log.debug('You cancelled the dialog.');
        });
    }

    _DialogController($scope, $mdDialog, station, category, lightbox) {
        let files_url = "/files/shares/plataforma/" //Folder in laravel where files are

        //For station dialog
        if (station != null) {
            $scope.station = station

            $scope.station.files_url = files_url;
            this.options = {
                fadeDuration: 0.7,
                resizeDuration: 0.5,
                fitImageInViewPort: true,
                positionFromTop: 20,
                showImageNumberLabel: false,
                alwaysShowNavOnTouchDevices: false,
                wrapAround: false
            };
        }

        //ADD Layer dialgo
        if (category != null) {
            $scope.category = category
            $scope.layer = {
                category_id: category.id,
                name: "",
                state: 1,
                isHeatmap: 0

            }
            $scope.add_layer = function(layer) {
                layer.type = "layer"
                if (layer.isHeatmap) {
                    //Si es heatmap, agregar la propiedad y la palabra heatmap, para el backend
                    layer.sourceType += ".heatmap." + layer.prop
                }

                $mdDialog.hide({ type: "layer", category: category, layer: layer });
            }
        } else {
            //ADD CATEGORY Dialgo

            $scope.category = {
                name: "",
                public_desc: "",
                admin_desc: "",
                state: 1
            }
            $scope.add_category = function(category) {
                category.type = "category"
                $mdDialog.hide(category);
            };

        }

        //Common functions
        $scope.open = function($index) {
            //lightbox.open(station.imgFiles, $index, this.options);
        }
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };

    }

    //FOR LAYER (Call from Callbak in Nav layer dialog)
    editLayerUploader(data, vm) {
        let layer = data.layer
        var hders = {
            'Content-Type': 'application/json',
            'Accept': 'application/x.laravel.v1+json'
        }
        var token = vm.$window.localStorage.satellizer_token
        if (token) {
            hders.Authorization = 'Bearer ' + token
        }

        layer.upload = vm.Upload.upload({
            url: vm.ContextService.baseUrl + '/api/layers',
            data: layer,
            headers: hders
        });

        layer.upload.then(function(response) {
            if (!response.error) {
                layer.files.result = response.data;
                swal('Capa Agregada Correctamente!', '', 'success');
                //Añadir item al array del category si es una nueva layer
                if (angular.isUndefined(data.category.layers)) {
                    data.category.layers = []
                }
                if (angular.isUndefined(data.layer.id)) {
                    vm.$timeout(function() {
                        data.category.layers.push(response.data.data.layer);
                        //Agregar source y layer al mapa
                        let addedLayer = response.data.data.layer
                        addedLayer.state = false
                        if (addedLayer.glSource != null && addedLayer.glLayers != null) {
                            var type = addedLayer.sourceType.split(".")[0]
                            if (type != "realtime_icons") {
                                let jsonGlLayers = JSON.parse(addedLayer.glLayers)
                                angular.forEach(jsonGlLayers, function(glLayer) {
                                    if (angular.isUndefined(glLayer.layout)) {
                                        glLayer.layout = { "visibility": "none" }
                                    } else {
                                        glLayer.layout.visibility = "none"
                                    }
                                    vm.glLayers.push(glLayer);
                                    vm.glLayersNames.push(glLayer.id);
                                });
                            } else {
                                //TODO: añadir elementos al glmarkers
                                //vm.$state.reload()
                            }
                            vm.glSources.push(JSON.parse(addedLayer.glSource));
                        }

                    });
                }
                data.layer.edit = false
                layer.state = 0
                layer.saved = true
                vm.showLayer(layer);

                vm.$log.debug(response);
            } else {
                vm.$log.debug(response)

            }

        }, function(response) {
            if (response.status > 0) {
                //errorMsg = response.status + ': ' + response.data;
                vm.$log.debug(response)
            }
        }, function(evt) {
            // Math.min is to fix IE which reports 200% sometimes

            layer.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            layer.files = []
        });
    }

    editLayer(layer) {
        let API = this.API;
        let $log = this.$log;
        let $state = this.$state;

        API.all('layers').post(layer).then((response) => {
            if (response.error) {
                $log.debug(response);
            } else {
                $log.debug(response);
            }
        }, function(response) {
            //$log.debug(response);}
            $state.go("login")
        })
    }

    deleteLayer(layer, category, $index) {
        let API = this.API
        let $log = this.$log
        let $timeout = this.$timeout
        let vm = this

        swal({
            title: 'Seguro?',
            text: 'No será posible recuperar la información!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, borrar.',
            //closeOnConfirm: false,
            //showLoaderOnConfirm: true,
            html: false
        }).then(function() {
            API.one('layers').one('', layer.id).remove()
                .then((response) => {
                    if (!response.error) {
                        swal({
                            title: 'Capa Borrada!',
                            text: 'Se ha eliminado correctamente la Categoria.',
                            type: 'success',
                            confirmButtonText: 'OK'
                                //closeOnConfirm: true
                        }).then(function() {
                            //quitar de categorias local
                            $timeout(function() {
                                layer.state = false
                                layer.deleted = true
                                vm.showLayer(layer);
                                category.layers.splice($index, 1);
                            });

                        })
                    } else {
                        $log.debug(response);
                    }
                })

        })
    }

    //FOR CATEGORY
    editCategory(category, categories, API, $log, $state) {
        API = angular.isDefined(API) ? API : this.API;
        categories = angular.isDefined(categories) ? categories : this.categories;
        $log = angular.isDefined($log) ? $log : this.$log;
        $state = angular.isDefined($state) ? $log : this.$state;
        API.all('categories').post(category).then((response) => {
                if (response.error) {
                    $log.debug(response);
                } else {
                    swal('Categoria Agregada Correctamente!', '', 'success');
                    //Añadir al array del nav si es una nueva categoria
                    if (angular.isUndefined(category.id)) {
                        categories.push(response.data.category);
                    }
                    category.edit = false
                    $log.debug(response);
                }
            },
            function(error) {
                // Handle error here
                $log.debug(error);
                $state.go("login")
            })
    }

    deleteCategory(category, $index) {
        let API = this.API
        let categories = this.categories
        let $log = this.$log
        let $timeout = this.$timeout
        let $state = this.$state
        swal({
            title: 'Seguro?',
            text: 'No será posible recuperar la información!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Si, borrar.',
            //closeOnConfirm: false,
            //showLoaderOnConfirm: true,
            html: false
        }).then(function() {
            API.one('categories').one('', category.id).remove()
                .then((response) => {
                    if (!response.error) {
                        swal({
                            title: 'Categoria Borrada!',
                            text: 'Se ha eliminado correctamente la Categoria.',
                            type: 'success',
                            confirmButtonText: 'OK'
                                //closeOnConfirm: true
                        }).then(function() {
                            //quitar de categorias local
                            category.edit = false
                            $timeout(function() {
                                categories.splice($index, 1);
                            });

                        })
                    } else {
                        $log.debug(response);
                    }
                }, function(response) {
                    $state.go("login")

                })

        })
    }

    changeStyle(style) {
        this.map.setStyle("mapbox://styles/mapbox/" + style);
    }

    buildToggler(componentId) {
        // let $mdSidenav = this.$mdSidenav
        return function() {
            this.$mdSidenav(componentId).toggle();
        };
    }

    change_perspective() {
        let pitch = 0;
        let bearing = 0
        if (this.perspective_2d) {
            pitch = 0;
            bearing = 0;
        } else {
            pitch = 50;
            bearing = -20;
        }

        this.map.flyTo({
            // These options control the ending camera position: centered at
            // the target, at zoom level 9, and north up.
            // center: target,
            //zoom: 9,
            bearing: bearing,
            pitch: pitch,
            essential: true,

            // These options control the flight curve, making it move
            // slowly and zoom out almost completely before starting
            // to pan.
            speed: 0.2, // make the flying slow
            curve: 1, // change the speed at which it zooms out

            // This can be any easing function: it takes a number between
            // 0 and 1 and returns another number between 0 and 1.
            easing: function(t) { return t; }
        });
    }

    register() {
        let vm = this
        swal({
            title: 'Aún no estas registrado?',
            text: 'Si deseas ver más capas, por favor registrate o ingresa a la plataforma con tu usuario.',
            type: 'info',
            showCancelButton: true,
            cancelButtonText: '<i class="fa fa-sign-in"></i> Ingresar',
            confirmButtonText: '<i class="fa fa-plus" aria-hidden="true"></i> Quiero Registrarme.',
            closeOnConfirm: false,
            closeOnCancel: false,
            //showLoaderOnConfirm: true,
            html: false
        }).then(function(isConfirm) {
                if (isConfirm) {
                    vm.$state.go("register")
                }
            },
            function(dismiss) {
                // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
                if (dismiss === 'cancel') {
                    vm.$state.go("login")

                }
            })
    }

    checkEdit(category) {
        if (this.can('manage.layers')) {
            category.edit = true
        } else {
            category.edit = false

        }
    }

}

export const ObsMapComponent = {
    templateUrl: './views/app/components/obs-map/obs-map.component.html',
    controller: ObsMapController,
    controllerAs: 'vm',
    bindings: {}
};