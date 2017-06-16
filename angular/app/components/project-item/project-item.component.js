class ProjectItemController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
        this.title = this.project.title
        this.progress = this.project.progress
    }
}

export const ProjectItemComponent = {
    templateUrl: './views/app/components/project-item/project-item.component.html',
    controller: ProjectItemController,
    controllerAs: 'vm',
    bindings: {
        project:"<"
    }
}
