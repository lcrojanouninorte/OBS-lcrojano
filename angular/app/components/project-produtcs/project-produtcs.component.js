class ProjectProdutcsController{
    constructor($uibModal,$mdSticky,$state){
        'ngInject';

        //
        //
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state
    }

    $onInit(){
    }

    open_budget(product_id) {
        let $uibModal = this.$uibModal
        let items = this.items

        var modalInstance = $uibModal.open({
            animation: true,
            template: "<product-budget></product-budget>",
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'lg'
        })
    }
}

export const ProjectProdutcsComponent = {
    templateUrl: './views/app/components/project-produtcs/project-produtcs.component.html',
    controller: ProjectProdutcsController,
    controllerAs: 'vm',
    bindings: {}
}
