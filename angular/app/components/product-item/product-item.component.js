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
        this.statesAsesor = [//Ya no se usa
            { color: 'color-1', name: 'Aprobado', value:1 },
            { color: 'color-2', name: 'Pendiente',value:2},
            { color: 'color-3', name: 'No Aprobado', value:3}
        ]

        this.statesEmpresario = [
            { color: 'color-3', name: 'No Iniciado', value:3 },
            { color: 'color-2', name: 'En Ejecución',value:2},
            { color: 'color-1', name: 'Finalizado', value:1}
        ]

        
  
    }

    $onInit(){
        this.nombre = this.product.nombre
        this.users = this.$scope.$parent.$parent.$parent.$parent.$parent.users
        
    }

  
    checkModelAsesor(checkModel) {
        this.checkAsesor = this.checkValues[++this.index % this.len];
    }
    status_info() {
        swal({
          title: '<i>Estados del Producto</i>',
          type: 'info',
          html:
          '<div class="text-left">' +
            '<b>No Iniciado</b>: Indica que el producto aun no lo a empezado a ejecutar. <br><br>' +
            '<b>En Ejecución</b>: Indica que actualmente se encuentra ejecutando este producto <br><br>' +
            '<b>Finalizado</b>: Indica que ya ha finalizado el producto <br><br>' +
          '</div>',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonAriaLabel: 'Ok!',
        })
    }

    update(){
        this.API.all('products/check').post(this.product).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    //TODO update progress not reload
                    this.$state.reload()
                    //swal('Proyecto actualizado con exito!', '', 'success')

                    //this.closeparent();
                    $log.debug(response);


                }
                    
            })
    }

    product_budget_open(product_id, mode) {
        let $uibModal = this.$uibModal
        
        let product = this.product

        let users = this.users

        let Mode = mode

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
               },
               mode:function() {
                   return Mode;
               }
            }
        })
    }

    modalcontroller($uibModalInstance, product,users, mode) {
        'ngInject'
        this.product = product
        this.users = users
        this.mode = mode
       
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
