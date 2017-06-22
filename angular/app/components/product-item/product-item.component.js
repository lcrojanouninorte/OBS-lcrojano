class ProductItemController{
    constructor($uibModal, $mdSticky, $state, $scope){
        'ngInject';

        //
        
        this.done = false
        this.checkValues = [false, true, null]
        this.len = this.checkValues.length
        this.index = 0
        this.checkModel = this.checkValues[this.index]

        //for modal
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state
       
    }

    $onInit(){
         this.nombre = this.product.nombre
    }

    checkModelChange() {
        this.checkModel = this.checkValues[++this.index % this.len];
    }

    open_budget(product_id) {
        let $uibModal = this.$uibModal
        
        let product = this.product

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "projectBudgetModal.html",
            controller: this.modalcontroller ,
            controllerAs: 'mvm',
            size: 'lg',
            resolve: {
               product: function() {
                   return product;
               }
            }
        })
    }

    modalcontroller($uibModalInstance, product) {
        'ngInject'
        this.product = product
        this.ok = () => {

          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }


}

export const ProductItemComponent = {
    templateUrl: './views/app/components/product-item/product-item.component.html',
    controller: ProductItemController,
    controllerAs: 'vm',
    bindings: {
        product:"="
    }
}
