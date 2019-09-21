class ObsMapController {
  constructor(API, AclService, $log, $compile, $scope, $mdDialog, $mdSidenav, lightbox, $timeout) {
    'ngInject';

    //
    this.API = API
    this.$log = $log
    this.$timeout = $timeout
    this.can = AclService.can
    this.$compile = $compile
    this.$scope = $scope
    this.$mdDialog = $mdDialog
    this.$mdSidenav = $mdSidenav
    this.lightbox = lightbox
    this.stations = {}
    this.markers = {}
    this.glMarkers = []
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

    //Categories
    this.categories = {}
    let Category = this.API.all('categories');
    Category.getList()
      .then((response) => {
        this.categories = response.plain()
    })

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
      }

    }

    this.glMaxBounds = [
      [-75, 9.9], // Southwest coordinates
      [-76, 9.9] // Northeast coordinates
    ];

    //For sidenav

  }

  buildToggler(componentId) {
    // let $mdSidenav = this.$mdSidenav
    return function () {
      this.$mdSidenav(componentId).toggle();
    };
  }

  $onInit() {
    this.toggleSidenav = this.buildToggler('closeEventsDisabled');

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

  show_station(ev, marker) {

    let $log = this.$log
    $log.debug(marker)
    this.$mdDialog.show({
      locals: { station: marker, layer_category:null }, //We use same controller for all modal in this page.
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

  //FOR CATEGORY
  editCategory(category, categories, API, $log){ 
    API = angular.isDefined(API) ?  API : this.API;
    categories = angular.isDefined(categories) ?  categories : this.categories;
    $log = angular.isDefined($log) ?  $log : this.$log;

    API.all('categories').post(category).then((response) => {
      if(response.error){
          $log.debug(response);
      }else{
        swal('Categoria Agregada Correctamente!', '', 'success');
        //Añadir al array del nav si es una nueva categoria
        if(angular.isUndefined(category.id)){
          categories.push(response.data.category);
        }
        category.edit = false
        $log.debug(response);
      }   
  },
  function(error) {
      // Handle error here
      $log.debug(error);

  })
  }

  deleteCategory(category, $index){
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
            if(!response.error){
              swal({
                title: 'Categoria Borrada!',
                text: 'Se ha eliminado correctamente la Categoria.',
                type: 'success',
                confirmButtonText: 'OK'
                //closeOnConfirm: true
              }).then( function () {
                //quitar de categorias local
                category.edit=false
                $timeout(function () {
                  categories.splice($index, 1);
                });
    
              })
            }
            else{
                $log.debug(response);
            }
        })
    
  })
  }

   //FOR LAYER
   editLayer(layer, categories, API, $log){ 
    API = angular.isDefined(API) ?  API : this.API;
    $log = angular.isDefined($log) ?  $log : this.$log;

    API.all('layers').post(layer).then((response) => {
      if(response.error){
          $log.debug(response);
      }else{
        swal('Capa Agregada Correctamente!', '', 'success');
        //Añadir item al array del category si es una nueva layer
        if(angular.isUndefined(layer.id)){
          categories[layer.$index].push(response.data.layer);
        }
        layer.edit = false
        $log.debug(response);
      }   
  },
  function(error) {
      // Handle error here
      $log.debug(error);

  })
  }

  deleteLayer(layer, category, $index){
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
            if(!response.error){
              swal({
                title: 'Capa Borrada!',
                text: 'Se ha eliminado correctamente la Categoria.',
                type: 'success',
                confirmButtonText: 'OK'
                //closeOnConfirm: true
              }).then( function () {
                //quitar de categorias local
                $timeout(function () {
                  category.splice($index, 1);
                });
    
              })
            }
            else{
                $log.debug(response);
            }
        })
    
  })
  }

  //General Add Item in nav, category or layer
  //For layer, we need his Category parent. 
  add_nav_item(ev,type, $category_index){
    $category_index = angular.isDefined( $category_index) ?  $category_index : null;

    let $log = this.$log
    let API = this.API
    let categories = this.categories
    let editCategory = this.editCategory
    let editLayer = this.editLayer

    let tpl = type == "category" ? "add-category-dialog.html" : "add-layer-dialog.html"

    this.$mdDialog.show({
      locals: { station: null, 
                layer_category: {
                                category: categories[$category_index], 
                                $index: $category_index
                              }
              },
      controller: this._DialogController,
      templateUrl: tpl,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
    .then(function (answer) {
      $log.debug('You said the information was "' + answer + '".');
      switch (answer.type) {
        case "category":
            editCategory(answer,categories, API, $log)
          break;
        case "layer":
            editLayer(answer,categories, API, $log)
            break;
        default:
          break;
      }
    }, function () {
      $log.debug('You cancelled the dialog.');
    });
  }

  _DialogController($scope, $mdDialog, station, layer_category, lightbox) {
    let files_url = "/files/shares/plataforma/" //Folder in laravel where files are
    
    //For station dialog
    if(station !== null){
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
    let category = {}
    let $index = ""
    //SUBCATEGORY dialgo
    if(layer_category !== null){
      category = layer_category.category
      $index = layer_category.$index
      
      $scope.category = category
      $scope.layer = {
        category_id:category.id,
        name:"",
        state:true,
        shp_zip_path:"",
        $index: $index
      }
      $scope.add_layer = function (layer) {
        layer.type="layer"
        $mdDialog.hide(layer);
      }
    }else{
        //CATEGORY Dialgo
          
        $scope.category = {
          name:"",
          public_desc:"",
          admin_desc:"",
          state:true
        }
        $scope.add_category = function (category) {
          category.type="category"
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
}

export const ObsMapComponent = {
  templateUrl: './views/app/components/obs-map/obs-map.component.html',
  controller: ObsMapController,
  controllerAs: 'vm',
  bindings: {}
};
