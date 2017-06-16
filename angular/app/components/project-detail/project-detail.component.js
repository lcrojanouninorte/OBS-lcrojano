class ProjectDetailController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
        this.tittle1 = "hola";
        this.title2 = "hla2";

        this.topDirections = ['left', 'up'];
        this.bottomDirections = ['down', 'right'];

        this.isOpen = false;

        this.availableModes = ['md-fling', 'md-scale'];
        this.selectedMode = 'md-fling';

        this.availableDirections = ['up', 'down', 'left', 'right'];
        this.selectedDirection = 'right';
    }
}

export const ProjectDetailComponent = {
    templateUrl: './views/app/components/project-detail/project-detail.component.html',
    controller: ProjectDetailController,
    controllerAs: 'vm',
    bindings: {}
}
