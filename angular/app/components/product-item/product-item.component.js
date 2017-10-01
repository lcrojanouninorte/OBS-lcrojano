class ProductItemController{
    constructor($uibModal, $mdSticky, $state, $scope, API, AclService){
        'ngInject';
 
        //
        this.hasRole = AclService.hasRole


        this.view_products = false;
        this.done = false
        this.checkValues = [false, true, null]
        this.len = this.checkValues.length
        this.index = 0
        this.checkAsesor = this.checkValues[this.index]
        this.checkEmpresario = false

        //for modal
        this.$uibModal = $uibModal
        this.$mdSticky = $mdSticky
        this.$state = $state
        this.API = API
        this.$scope = $scope

        this.stateAsesor = 1
        this.stateEmpresario = 1
        this.statesAsesor = [
            { color: 'color-1', name: 'Aprobado', value:1 },
            { color: 'color-2', name: 'Pendiente',value:2},
            { color: 'color-3', name: 'No Aprobado', value:3}
        ]

        this.statesEmpresario = [
            { color: 'color-3', name: 'Do', value:3 },
            { color: 'color-2', name: 'Doing',value:2},
            { color: 'color-1', name: 'Done', value:1}
        ]

        
  
    }

    $onInit(){
         this.nombre = this.product.nombre
         this.users = this.$scope.$parent.$parent.$parent.$parent.$parent.users;
    }

  
    checkModelAsesor(checkModel) {
        this.checkAsesor = this.checkValues[++this.index % this.len];
    }

    update(){
        this.API.all('products/check').post(this.product).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    //this.$state.reload()
                    //swal('Proyecto actualizado con exito!', '', 'success')

                    //this.closeparent();
                    $log.debug(response);


                }
                    
            })
    }

    open_budget(product_id) {
        let $uibModal = this.$uibModal
        
        let product = this.product

        let users = this.users

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "BudgetModal.html",
            controller: this.modalcontroller ,
            controllerAs: 'mvm',
            size: 'lg',
            resolve: {
               product: function() {
                   return product;
               },
               users:function() {
                   return users;
               }
            }
        })
    }

    modalcontroller($uibModalInstance, product,users) {
        'ngInject'
        this.product = product
        this.users = users
       
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
        product:"=",
        delete:"&"
         
    }
}
