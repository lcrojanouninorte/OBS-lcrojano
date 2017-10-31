class UserProjectsController {
    constructor($uibModal, $mdSticky, $state,AclService) {
        'ngInject';

        //
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state
        this.can = AclService.can

      this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];

      this.isOpen = false;

      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-fling';

      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'left'


    }

    $onInit() {

    }

    create_empresario() {
        let $uibModal = this.$uibModal
        let items = this.items

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addempresario.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'sm'
        })
    }


    create_project() {
        let $uibModal = this.$uibModal
        let items = this.items

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'lg'
        })
    }

    modalcontroller ($uibModalInstance) {
    'ngInject'
    this.ok = () => {

      $uibModalInstance.close($scope.selected.item)
    }

    this.cancel = () => {

      $uibModalInstance.dismiss('cancel');
      

     
    }
  }


}

export const UserProjectsComponent = {
    templateUrl: './views/app/components/user-projects/user-projects.component.html',
    controller: UserProjectsController,
    controllerAs: 'vm',
    bindings: {}
}
