class ProjectListController{
    constructor(API,AclService ,$scope, $state, $uibModal, $log, Upload, $timeout, $window){
        'ngInject';
        //

        this.API = API
        this.$window =$window
        this.$log = $log
        this.$state = $state
        this.originatorEv = {}
        this.can = AclService.can
        this.$uibModal =$uibModal
        let Bots = this.API.all('bots');
        Bots.getList()
          .then((response) => {
            this.bots = response.plain()
        })
        this.robotFilter = ""
        this.bot = {
          current_index: 1,
          active:1, 
          type :this.$state.params.botsType

        }
        this.bot_origin = angular.copy(this.bot)
        this.cities = {}
        this.Upload = Upload
        this.$timeout =$timeout
        this.errorMsg=""
        this.add_check = false
        
          //Todo: Let agregate
        this.cities = [
            { "id": 1, "name" :  "Remorques en Direct Qu̩ebec"},
            { "id": 2, "name" :  "Remorques en Direct Montreal"},
            { "id": 3, "name" :  "Remorques en Direct Trois-Rivieres"},
            { "id": 4, "name" :  "Remorques en Direct Drummondville"},
            { "id": 5, "name" :  "Remorques en Direct New Brunswick"},
            { "id": 6, "name" :  "Remorques en Direct Rive-Nord"},
            { "id": 7, "name" :  "Remorques en Direct Rive-Sud"},
            { "id": 8, "name" :  "Remorques en Direct Lévis"},
            { "id": 9, "name" :  "Remorques en Direct Saguenay"}
        ]
    }
    
    $onInit(){
      this.bot = {
        current_index: 1,
        active:1, 
        type :this.$state.params.botsType
      }
    }

    uploadExcel() {
      let bot = this.bot
      let bot_origin = this.bot_origin 
      let bots = this.bots
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
      
      bot.upload = this.Upload.upload({
        url: 'http://robot.lcrojano.com/api/bots', //Change: emote: http://robot.lcrojano.com/api/bots local: http://localhost:8000/api
        data: bot,
        headers: hders
      });
  
      bot.upload.then(function (response) {
        //this.$timeout(function () {
          if(bot.type=="LesPac"){ // si es lespac, guardar archivo
            bot.file.result = response.data;
          }
         
          //ajustes
          bots.push(angular.copy(bot))
          bot = angular.copy(bot_origin)
          //add_check = false
          $state.reload()
       // });
      }, function (response) {
        if (response.status > 0)
          this.errorMsg = response.status + ': ' + response.data;
          this.$log.debug(response)
              }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        if(bot.type=="LesPac"){ // si es lespac, guardar archivo
          bot.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }
         
      });
    }

    delete(botID) {
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
          API.one('bots').one('', botID).remove()
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

    update(bot){
 
      if(bot.type == "LesPac" && bot.file!=null){
        let $state = this.$state
        var hders = {
          'Content-Type': 'application/json',
          'Accept': 'application/x.laravel.v1+json'
        }
        var token = this.$window.localStorage.satellizer_token
        if (token) {
          hders.Authorization = 'Bearer ' + token
        }
        
        bot.upload = this.Upload.upload({
          url: 'http://robot.lcrojano.com/api/bots', //CHANGE
          data: bot,
          headers: hders
        });
    
        bot.upload.then(function (response) {
          //this.$timeout(function () {
            $state.reload()
        // });
        }, function (response) {
          if (response.status > 0)
            this.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
             bot.file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }else{
        //update    
        this.API.one('bots').customPUT(bot,bot.id).then((response) => {
          if(response.error){
              this.$log.debug(response);
          }else{
              this.$state.reload()
              this.$log.debug(response);
              swal('Bot updated!', '', 'success')

              this.closeparent();
              this.$log.debug(response);

          }
              
        })
      }

    }

    edit_bot(bot) {
        let $uibModal = this.$uibModal
        let Bot = bot
        $uibModal.open({
            animation: true,
            templateUrl: 'myModalBot.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'lg',
            resolve: {
                bot: function() {
                   return Bot;
               }
            }

        })
    }

    loadCities(){
      let Cities = this.API.one('cities')

      Cities.getList().then((response) => {
          if(!response.error){
              this.cities = response
          }
        }).catch(this.errorMsg = "fail cities")
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

    modalcontroller($uibModalInstance, bot) {
        'ngInject'
        this.bot = bot
       
        this.ok = () => {
          //$uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }

}

export const ProjectListComponent = {
    templateUrl: './views/app/components/project-list/project-list.component.html',
    controller: ProjectListController,
    controllerAs: 'vm',
    bindings: {}
}
