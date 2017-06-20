class ProjectListController{
    constructor(API){
        'ngInject';

        //

        this.API = API
        let Projects = this.API.all('projects');
        Projects.getList()
          .then((response) => {
            this.projects = response.plain()
          })
    }

    $onInit(){

       
    }
}

export const ProjectListComponent = {
    templateUrl: './views/app/components/project-list/project-list.component.html',
    controller: ProjectListController,
    controllerAs: 'vm',
    bindings: {}
}
