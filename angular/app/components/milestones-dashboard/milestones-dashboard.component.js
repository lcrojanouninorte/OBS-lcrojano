class MilestonesDashboardController{
    constructor(API, $stateParams, AclService){
        'ngInject';

        //
        this.API = API
        this.milestonesList = []
        this.projectId = $stateParams.projectId
        this.mode =""
        this.isAsesor = AclService.hasRole("asesor");
        this.isEmpresario = AclService.hasRole("empresario");

    }

    $onInit(){
        this.mode_url =this.mode || ''
        let Milestones = this.API.one('milestones/'+this.mode_url,this.projectId);
        Milestones.get()
          .then((response) => {
            if(!response.error){   
                this.milestonesList = response.data.milestones
                 console.log(this.milestonesList)
            }
        });
    }
}

export const MilestonesDashboardComponent = {
    templateUrl: './views/app/components/milestones-dashboard/milestones-dashboard.component.html',
    controller: MilestonesDashboardController,
    controllerAs: 'vm',
    bindings: {
     mode:"<"
    }
};
