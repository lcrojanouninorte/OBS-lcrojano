class StationsListController{
    constructor(API,AclService, $scope, $state, $mdDialog, $log, Upload, $timeout, $window, $auth){
        'ngInject';
        //
        this.$scope = $scope
        this.API = API
        this.$window =$window
        this.$log = $log
        this.$state = $state
        this.originatorEv = {}
        this.can = AclService.can
        this.$mdDialog =$mdDialog
        this.isLogged = $auth.isAuthenticated()

        //Stations
        let Stations = this.API.all('stations');
        Stations.getList()
          .then((response) => {
            this.stations = response.plain()
        })
        this.stationFilter = ""
        this.station = {
          state:1 
        }
        this.station_origin = angular.copy(this.station)
        this.Upload = Upload
        this.$timeout =$timeout
        this.errorMsg=""
        this.add_check = false

        //Columns
        this.columns = {}
        let Columns = this.API.all('columns');
        Columns.getList()
          .then((response) => {
            this.columns = response.plain()
        })

        //FAB
        this.isOpen = false;
        
    }
   
    $onInit(){

    }

    uploadStation(station, vm) {//Viene de un modal
      
      var hders = {
        'Content-Type': 'application/json',
        'Accept': 'application/x.laravel.v1+json'
      }
      var token = vm.$window.localStorage.satellizer_token
      if (token) {
        hders.Authorization = 'Bearer ' + token
      }
      
      station.upload = this.Upload.upload({
        url: 'http://localhost:8000/api/stations', //Change: emote: http://rostation.lcrojano.com/api/stations local: http://localhost:8000/api
        data: station,
        headers: hders
      });
  
      station.upload.then(function (response) {
          station.files.result = response.data;
          vm.$state.reload()
        
        }, function (response) {
          if (response.status > 0){
            vm.errorMsg = response.status + ': ' + response.data;
            vm.$log.debug(response)
          }
        }, function (evt) {         
          station.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          station.files = []
          station.image = []

      });
    }

    delete(stationID) {
        let API = this.API
        let $state = this.$state
    
        swal({
          title: 'Sure?',
          text: 'Data won\'t get back!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Yes, delete!',
          //closeOnConfirm: false,
          //showLoaderOnConfirm: true,
          html: false
        }).then(function () {
          API.one('stations').one('', stationID).remove()
            .then((response) => {
                if(!response.error){
                  swal({
                    title: 'Deleted!',
                    text: 'Deleted with success.',
                    type: 'success',
                    confirmButtonText: 'OK'
                    //closeOnConfirm: true
                  }).then( function () {
                    $state.reload()
                  })
                }
                else{
                    this.$log.debug(response);
                }
            })
        
      })
    }
 
    download_fuente(f_path){  
        this.API.one('projects/file_download')
            .withHttpConfig({responseType: 'blob' })
            .customPOST({"filePath":f_path})
            .then(function(response) {
                //TODO recueprar nombre
                if(response.errors){
                    this.$log.debug(response);
                }else{
                    var url = (window.URL || window.webkitURL).createObjectURL(response);

                    window.open(url,"_self");
             }
            });
    }
    openDialog(ev, option){
      let template = ""
      let $log = this.$log
      let API  = this.API
      let $state = this.$state
      let vm= this

      if(!vm.isLogged){
        vm.$state.go("login")
      }

      if(option==1){
        template = "addStationTemp.html"
      }else{
        template = "addColumnTemp.html"
      }

      this.$mdDialog.show({
        locals: {
          option: option
        },
        controller: this.modalcontroller,
        templateUrl: template,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true // Only for -xs, -sm breakpoints.
      }).then(function (answer) {
        //CALLBACK WHEN USER CLIC ON SAVE IN CREATE NAV ITEM MODAL
          $log.debug('You said the information was "' + answer + '".');
          switch (answer.type) {
            case "column":
              API.all('columns').post(answer).then((response) => {
                if(response.errors){
                    $log.debug(response);
                }else{
                    $state.reload()
                    swal('Columna Agregada Correctamente!', '', 'success')
                   // this.closeparent();
                    //$log.debug(response);
                }
                    
              })
              break;
            case "station":
                vm.uploadStation(answer, vm)
              break;
            default:
              break;
          }
        }, function () {
          $log.debug('You cancelled the dialog.');
        });

    }
     
    editColumn(column){
      let $log = this.$log
      this.API.all('columns').post(column).then((response) => {
        if(response.errors){
          $log.debug(response);
        }else{
            //this.$state.reload()
            //swal('Columna Agregada Correctamente!', '', 'success')

            $log.debug(response)
            column.edit=false

        }
            
      })
    }

    deleteColumn(column){
      let API = this.API
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
      }).then(function () {
        API.one('columns').one('', column.id).remove()
          .then((response) => {
              if(!response.error){
                swal({
                  title: 'Columna Borrada!',
                  text: 'Se ha eliminado correctamente la columna.',
                  type: 'success',
                  confirmButtonText: 'OK'
                  //closeOnConfirm: true
                }).then( function () {
                  $state.reload()
                })
              }
              else{
                  this.$log.debug(response);
              }
          })
      
    })
    }

    modalcontroller($scope, $mdDialog, option) {
        'ngInject'
        $scope.option = option

        if(option==1){
          $scope.form = {
            type:"station",
            name:""
          }
        }else{
          $scope.form = {
            type:"column",
            name:""
          }
        }

      //Common functions
      $scope.open = function ($index) {
      }
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.answer = function () {
        $mdDialog.hide($scope.form);
      };

  }

}

export const StationsListComponent = {
    templateUrl: './views/app/components/stations-list/stations-list.component.html',
    controller: StationsListController,
    controllerAs: 'vm',
    bindings: {}
}
