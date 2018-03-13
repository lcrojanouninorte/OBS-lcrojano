class ProjectListController{
    constructor(API,AclService ,$scope, $state, $uibModal, $log){
        'ngInject';
        //

        this.API = API
        this.$log = $log
        this.$state = $state
        this.originatorEv = {}
        this.can = AclService.can
        this.$uibModal =$uibModal
        let Bots = this.API.all('bots');
        this.robotFilter = ""
        Bots.getList()
          .then((response) => {
            this.bots = response.plain()
          })

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
      //update
      this.API.one('bots').customPUT(bot,bot.id).then((response) => {
        if(response.error){
            this.$log.debug(response);
        }else{
            this.$state.reload()
            swal('Bot updated!', '', 'success')

            this.closeparent();
            this.$log.debug(response);


        }
            
    })
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
