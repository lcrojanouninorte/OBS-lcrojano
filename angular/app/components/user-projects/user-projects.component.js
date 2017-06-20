class UserProjectsController {
    constructor($uibModal, $mdSticky, $state) {
        'ngInject';

        //
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state


    }

    $onInit() {

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
