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
        this.results = [
        {id:1, nombre: "Trasnferencia SENA", progreso:10},
        {id:2,nombre: "Crear una plataforma",progreso:50},
        {id:3,nombre: "Pruebas", progreso:100}
        ]
        
    }

    $onInit(){
        //get project and his results.
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
