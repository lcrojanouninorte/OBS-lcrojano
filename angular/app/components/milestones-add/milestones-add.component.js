class MilestonesAddController{
    constructor(API, $state){
        'ngInject';

        //

        this.API = API
        this.$state = $state
        this.milestone ={"fecha":""};
        this.milestone.fecha = new Date();
        this.milestone.dias = 31;

        //
    }

    $onInit(){
    }
        add(){//add item from form controller

        this.milestone.project_id = this.projectId
        let new_milestone = this.milestone
        this.API.service('milestone').post(new_milestone).then((response) => {
                if(response.errors){
                    $log.debug(response);
                }else{
                   
                    swal('Hito creado con exito!', '', 'success')
                    this.$state.reload()
                    this.walletList.push(response.data.wallet)
                    $log.debug(response)
                }
            }

        )
    }
}

export const MilestonesAddComponent = {
    templateUrl: './views/app/components/milestones-add/milestones-add.component.html',
    controller: MilestonesAddController,
    controllerAs: 'vm',
    bindings: {
        projectId:"<"
    }
};
