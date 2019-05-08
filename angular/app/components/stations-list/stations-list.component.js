class StationsListController{
    constructor(API,AclService, $scope, $state, $uibModal, $log, Upload, $timeout, $window){
        'ngInject';
        //

        this.API = API
        this.$window =$window
        this.$log = $log
        this.$state = $state
        this.originatorEv = {}
        this.can = AclService.can
        this.$uibModal =$uibModal
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

    }
    
    $onInit(){
      
    }

    uploadExcel(station) {
      //let station = station //station to edit or to add
      let station_origin = this.station_origin 
      let stations = this.stations
      //let add_check = this.add_check
      let $state = this.$state
      var hders = {
        'Content-Type': 'application/json',
        'Accept': 'application/x.laravel.v1+json'
      }
      var token = this.$window.localStorage.satellizer_token
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
          //ajustes
          //stations.push(angular.copy(station))
          //station = angular.copy(station_origin)
          //add_check = false
          $state.reload()
        
        }, function (response) {
          if (response.status > 0){
            this.errorMsg = response.status + ': ' + response.data;
            this.$log.debug(response)
          }
        }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
         
          station.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          station.files = []
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

    modalcontroller($uibModalInstance, station) {
        'ngInject'
        this.station = station
       
        this.ok = () => {
          //$uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }

}

export const StationsListComponent = {
    templateUrl: './views/app/components/stations-list/stations-list.component.html',
    controller: StationsListController,
    controllerAs: 'vm',
    bindings: {}
}
