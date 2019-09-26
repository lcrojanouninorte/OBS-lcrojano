class ObsMapController {
  constructor(API, AclService, $log, $compile, $scope, $mdDialog, $mdSidenav, lightbox, $timeout, Upload,$window, mapboxglMapsData, $interval) {
    'ngInject';

    //
    this.API = API
    this.map = null
    this.mapboxglMapsData = mapboxglMapsData
    this.$log = $log
    this.$timeout = $timeout
    this.$interval = $interval
    this.$window  = $window
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
    this.glSources =[]//contendra el geojson de cada capa
    this.glLayers = []//contendra cada capa
    this.glStyle = 'mapbox://styles/mapbox/satellite-v9'
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
      custom: [
        {
          constructor: this.CustomControl,
          name: 'CustomControl1',
          options: {
            position: 'top-left'
          },
          events: ['buttonClick']
        }
      ]

    }
    this.showStyles = false
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
              onClose: function (event, popupClosed) {
                // ...
              }
            }
          }

          this.glMarkers.push(marker)
        }

      }
    })
  }

  //CUSTOM CONTROL FOR CHANGE MAPS STYLEs
    CustomControl(options) {
      this.options = this.options || {};

      angular.extend(this.options, options);
    }

    $onInit(){
      this.toggleSidenav = this.buildToggler('closeEventsDisabled');

      let Category = this.API.all('categories');
      let glLayers = this.glLayers
      let glSources = this.glSources
      let $timeout = this.$timeout
      Category.getList()
        .then((response) => {
          this.categories = response.plain()
          angular.forEach(this.categories, function(category) {
            category.hide = true
            angular.forEach(category.layers, function(layer) {
              if(layer.glSource!==null && layer.glLayers!==null){
                  let jsonGlLayers = JSON.parse(layer.glLayers)
                  angular.forEach(jsonGlLayers, function(glLayer) {
                    glLayers.push(glLayer);
                  });
                glSources.push(JSON.parse(layer.glSource));
              }
              
            });
          });
        })

      this.$scope.$on('mapboxglMap:load', function (event, mapboxglMapEvent) {
      /* map.loadImage('https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg', function(error, image) {
          map.addImage('obsmarker', image);
        })*/
          
        event.currentScope.vm.map  = event.currentScope.vm.mapboxglMapsData.getMapById('obsMap');
        event.currentScope.$apply();
        let tglLayers = event.currentScope.vm.glLayers
        let tglSources =  event.currentScope.vm.glSources
        let currentScope = event.currentScope
        event.currentScope.vm.map.on('style.load', function (obj) {
          // Triggered when `setStyle` is called.
          currentScope.vm.glSources = []
          currentScope.vm.glLayers = []
          currentScope.$apply();

          currentScope.vm.glSources = tglSources
          currentScope.vm.glLayers = tglLayers
          currentScope.$apply();   
          
        });

        //actualizar sensores tiempo real
      // var angularInterval = $interval(dataTime, 10000);

      });    
    
      this.CustomControl.prototype = new mapboxgl.Evented();

      this.CustomControl.prototype.onAdd = function (map) {
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
      
        button.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          self.fire('buttonClick', event);
        });
        buttonContainer.appendChild(button);
        container.appendChild(buttonContainer);
        return container;
      };
      this.$scope.$on('mapboxgl:CustomControl1:buttonClick', function (event, controlEvent) {
        event.currentScope.vm.showStyles =  !event.currentScope.vm.showStyles 
        event.currentScope.$apply();
      }); 
      
    }

    createElement(marker) {
      var el = document.createElement('div');
      //element.style.width = iconSize.width + 'px';
      //element.style.height = iconSize.height + 'px';
      //element.style.borderRadius = '50%';

      //create a DOM element for the marker

      el.className = marker.icon;
      el.setAttribute("ng-click", "vm.show_station($event," + JSON.stringify(marker) + ");");
      el.innerHTML = "<span class='marker-title'>" + marker.name + "</span>";
      el = this.$compile(el)(this.$scope);

      return el[0];
    }

    showLayer(layer){
      let map = this.map
      let glLayers = this.glLayers
      if(layer.state===false) {
        //Desactivar todos los stilos de esta capa      
        for (var i = glLayers.length - 1; i >= 0; i--) {
          if (glLayers[i].layer_id === layer.id) {
              map.setLayoutProperty(glLayers[i].id, 'visibility', 'none')
          }
        }
      } else {
        //let target = []
        if(layer.glLayers!==null && this.map!==null){
          for (var j = glLayers.length - 1; j >= 0; j--) {
            if (glLayers[j].layer_id === layer.id) {
                map.setLayoutProperty(glLayers[j].id, 'visibility', 'visible')
                //target = glLayers[j].target;
            }
          }
          //this.fly_to_location(target)
        }
      }

    }

    setLayerSource (layerId, source, sourceLayer) {
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
        .then(function (answer) {
          $log.debug('You said the information was "' + answer + '".');
        }, function () {
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
      }).then(function (answer) {
        //CALLBACK WHEN USER CLIC ON SAVE IN CREATE NAV ITEM MODAL
          $log.debug('You said the information was "' + answer + '".');
          switch (answer.type) {
            case "category":
              editCategory(answer, categories, API, $log)
              break;
            case "layer":
              editLayerUploader(answer, categories, API, $log, $timeout, $window, Upload,showLayer)
              break;
            default:
              break;
          }
        }, function () {
          $log.debug('You cancelled the dialog.');
        });
    }

    _DialogController($scope, $mdDialog, station, category, lightbox) {
      let files_url = "/files/shares/plataforma/" //Folder in laravel where files are

      //For station dialog
      if (station !== null) {
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
      if (category !== null) {
        $scope.category = category
        $scope.layer = {
          category_id: category.id,
          name: "",
          state: true,
        }
        $scope.add_layer = function (layer) {
          layer.type = "layer"
          $mdDialog.hide({type:"layer", category: category, layer:layer});
        }
      } else {
        //ADD CATEGORY Dialgo

        $scope.category = {
          name: "",
          public_desc: "",
          admin_desc: "",
          state: true
        }
        $scope.add_category = function (category) {
          category.type = "category"
          $mdDialog.hide(category);
        };

      }

      //Common functions
      $scope.open = function ($index) {
        lightbox.open(station.imgFiles, $index, this.options);
      }
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
        $mdDialog.hide(answer);
      };

    }

    //FOR LAYER (Call from Callbak in Nav item dialog)
    editLayerUploader(data, categories, API, $log, $timeout, $window, Upload,showLayer) {

      API = angular.isDefined(API) ? API : this.API;
      $log = angular.isDefined($log) ? $log : this.$log;
      $timeout = angular.isDefined($timeout) ? $timeout : this.$timeout;
      let layer = data.layer
      
      var hders = {
        'Content-Type': 'application/json',
        'Accept': 'application/x.laravel.v1+json'
      }
      var token = $window.localStorage.satellizer_token
      if (token) {
        hders.Authorization = 'Bearer ' + token
      }
      
      layer.upload = Upload.upload({
        url: 'http://localhost:8000/api/layers', //Change: emote: http://rostation.lcrojano.com/api/stations local: http://localhost:8000/api
        data: layer,
        headers: hders
      });
  
      layer.upload.then(function (response) {
        if (!response.error) {
          layer.files.result = response.data;
          swal('Capa Agregada Correctamente!', '', 'success');
          //Añadir item al array del category si es una nueva layer
          if(angular.isUndefined(data.category.layers)){
            data.category.layers=[]
          }
          if (angular.isUndefined(data.layer.id)) {
            $timeout(function () {
                data.category.layers.push(response.data.data.layer);
            });
          }
          data.layer.edit = false 
          
          showLayer(layer);
          
          $log.debug(response);
        }else{
          $log.debug(response)

        }
        
        }, function (response) {
          if (response.status > 0){
            //errorMsg = response.status + ': ' + response.data;
            $log.debug(response)
          }
        }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
         
        layer.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        layer.files = []
      });
    }
  
    editLayer(data, categories, API, $log, $timeout) {
      API = angular.isDefined(API) ? API : this.API;
      $log = angular.isDefined($log) ? $log : this.$log;
      $timeout = angular.isDefined($timeout) ? $timeout : this.$timeout;
  
      API.all('layers').post(data.layer).then((response) => {
        if (response.error) {
          $log.debug(response);
        } else {
          swal('Capa Agregada Correctamente!', '', 'success');
          //Añadir item al array del category si es una nueva layer
          if(angular.isUndefined(data.category.layers)){
            data.category.layers=[]
          }
          if (angular.isUndefined(data.layer.id)) {
            this.showLayer(data.layer);

          }
          data.layer.edit = false
          $log.debug(response);
        }
      },
        function (error) {
          // Handle error here
          $log.debug(error);
  
        })
    }
  
    deleteLayer(layer, category, $index) {
      let API = this.API
      let $log = this.$log
      let $timeout = this.$timeout
  
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
      }).then(function () {
        API.one('layers').one('', layer.id).remove()
          .then((response) => {
            if (!response.error) {
              swal({
                title: 'Capa Borrada!',
                text: 'Se ha eliminado correctamente la Categoria.',
                type: 'success',
                confirmButtonText: 'OK'
                //closeOnConfirm: true
              }).then(function () {
                //quitar de categorias local
                $timeout(function () {
                  category.layers.splice($index, 1);
                });
  
              })
            }
            else {
              $log.debug(response);
            }
          })
  
      })
    }

      //FOR CATEGORY
    editCategory(category, categories, API, $log) {
      API = angular.isDefined(API) ? API : this.API;
      categories = angular.isDefined(categories) ? categories : this.categories;
      $log = angular.isDefined($log) ? $log : this.$log;

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
        function (error) {
          // Handle error here
          $log.debug(error);

        })
    }

    deleteCategory(category, $index) {
      let API = this.API
      let categories = this.categories
      let $log = this.$log
      let $timeout = this.$timeout

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
      }).then(function () {
        API.one('categories').one('', category.id).remove()
          .then((response) => {
            if (!response.error) {
              swal({
                title: 'Categoria Borrada!',
                text: 'Se ha eliminado correctamente la Categoria.',
                type: 'success',
                confirmButtonText: 'OK'
                //closeOnConfirm: true
              }).then(function () {
                //quitar de categorias local
                category.edit = false
                $timeout(function () {
                  categories.splice($index, 1);
                });

              })
            }
            else {
              $log.debug(response);
            }
          })

      })
    }

    changeStyle(style){
      this.map.setStyle("mapbox://styles/mapbox/"+style); 
    }

    buildToggler(componentId) {
      // let $mdSidenav = this.$mdSidenav
      return function () {
        this.$mdSidenav(componentId).toggle();
      };
    }

    fly_to_location(target){
      this.map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: target,
        zoom: 9,
        bearing: 0,
        
        // These options control the flight curve, making it move
        // slowly and zoom out almost completely before starting
        // to pan.
        speed: 0.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out
        
        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) { return t; }
        });
    }

}

export const ObsMapComponent = {
  templateUrl: './views/app/components/obs-map/obs-map.component.html',
  controller: ObsMapController,
  controllerAs: 'vm',
  bindings: {}
};
