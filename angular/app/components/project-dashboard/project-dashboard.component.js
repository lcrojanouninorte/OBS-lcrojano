class ProjectDashboardController{
    constructor($uibModal, $mdSticky, $state,$stateParams, API, $scope, AclService) {
        'ngInject';

        //
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state
        this.can = AclService.can

        //
        this.id = $stateParams.projectId
        this.API = API
        this.project = {}
        this.dial = {}
        this.dial.isOpen = true;
        this.dial.selectedMode = 'md-fling'
        this.dial.selectedDirection = 'down'
        this.results = []
        this.$scope = $scope;

         

        
    }

    $onInit(){
        //get project and his results.
        let Project = this.API.one('project', this.id)
        Project.get()
          .then((response) => {
            if(!response.error){   
                this.project = response.data
                this.results = this.project.results
                this.$scope.users = this.project.users //pasar solo los usuarios a los componentes hijos
            }
        });
    }



    create_result() {
        let $uibModal = this.$uibModal
        let project = this.project
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalResult.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'md',
            resolve: {
               project: function() {
                   return project;
               }
            }

        })
    }

    modalcontroller ($uibModalInstance, project) {
    'ngInject'
        this.project_id = project.id;
        this.project_name = project.titulo;
        this.ok = () => {

          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');

        }

        this.project = this.id;
    }

}

export const ProjectDashboardComponent = {
    templateUrl: './views/app/components/project-dashboard/project-dashboard.component.html',
    controller: ProjectDashboardController,
    controllerAs: 'vm',
    bindings: {}
}
