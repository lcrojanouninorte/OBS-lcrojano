class ProjectDashboardController{
    constructor($stateParams, API){
        'ngInject';

        //
        this.id = $stateParams.projectId;
        this.API = API
        this.project = {}
        this.dial = {}
        this.dial.isOpen = true;
        this.dial.selectedMode = 'md-fling';
        this.dial.selectedDirection = 'down';
        
    }

    $onInit(){
        let Project = this.API.one('project', this.id)
        Project.get()
          .then((response) => {
            if(!response.error){   
                this.project = response.data
            }
        });
    }


}

export const ProjectDashboardComponent = {
    templateUrl: './views/app/components/project-dashboard/project-dashboard.component.html',
    controller: ProjectDashboardController,
    controllerAs: 'vm',
    bindings: {}
}
