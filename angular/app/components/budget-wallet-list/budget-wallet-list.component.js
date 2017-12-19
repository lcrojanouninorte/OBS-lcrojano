class BudgetWalletListController{
    constructor(API, $state){
        'ngInject';

        //

         this.API = API
         this.$state = $state
         this.wallet = [];


    }

    $onInit(){

                  
    }

        delete (wallet_item) {
            let API = this.API
            let $state = this.$state
            let walletList = this.walletList
            let vm = this


            swal({
              title: 'Seguro?',
              text: 'No sera posible recuperar estos datos!',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Si Quiero borrarlo!',
              //closeOnConfirm: false,
              //showLoaderOnConfirm: true,
              html: false
            }).then(function () {

              API.one('wallets').one('', wallet_item.id).remove()
                .then((response) => {
                    if(!response.error){
                          vm.totalActual = vm.totalActual - wallet_item.cantidad;
                          //Actualizar total del procuto!
                          vm.productWalletTotal = vm.productWalletTotal - wallet_item.cantidad
                          walletList.splice( walletList.indexOf(wallet_item), 1 );
                      swal({
                        title: 'Borrado!',
                        text: 'Se ha borrado el gasto con exito.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        //closeOnConfirm: true
                      }).then( function () {

                        
                        //totalActual = totalActual - wallet_item.cantidad;
                        //$state.reload()
                      })
                    }
                    else{
                        this.$log.debug(response);
                    }
                })
            
          })
        }
}

export const BudgetWalletListComponent = {
    templateUrl: './views/app/components/budget-wallet-list/budget-wallet-list.component.html',
    controller: BudgetWalletListController,
    controllerAs: 'vm',
    bindings: {
        productWalletTotal:"=",
        walletList:"=",
        totalActual:"="
    }
};
