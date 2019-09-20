class ObsMapController {
  constructor(API, AclService, $log, $compile, $scope, $mdDialog, $mdSidenav, lightbox) {
    'ngInject';

    //
    this.API = API
    this.$log = $log
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
      locals: { station: marker },
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

  _DialogController($scope, $mdDialog, station, lightbox) {
    let files_url = "/files/shares/plataforma/" //Folder in laravel where files are

    $scope.station = station
    $scope.station.files_url = files_url;
    //TODO: esto puede ser manejado por administrador
    //station.duration = files_url + station.duration
    //station.frequencies = files_url + station.frequencies
    //station.readings_csv = files_url+ station.readings_csv

    //Filtrar station.file en 2 tipos, archivos o imagenes.

    //list available lightbox default options
    this.options = {
      fadeDuration: 0.7,
      resizeDuration: 0.5,
      fitImageInViewPort: true,
      positionFromTop: 20,
      showImageNumberLabel: false,
      alwaysShowNavOnTouchDevices: false,
      wrapAround: false
    };

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
