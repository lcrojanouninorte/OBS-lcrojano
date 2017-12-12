class BudgetWalletAddController{
    constructor(API, $state){
        'ngInject';

        //

        this.API = API
        this.$state = $state
        this.wallet = {};
    }

    $onInit(){

    }
    add(){//add item from form controller

        
        let new_wallet = {
            "desc":this.wallet.desc,
            "cantidad": this.wallet.cantidad,
            "product_id": this.productId,
            "budget_product_id": this.pbudget.id, //Cambiar por BudgetProduct
            "user_id": this.userId

        }
        this.API.service('wallets').post(new_wallet).then((response) => {
                if(response.errors){
                    $log.debug(response);
                }else{
                   
                    swal('Gasto asignado con exito!', '', 'success')
                    this.$state.reload()
                    this.walletList.push(angular.copy(response.data.wallet))
                    this.wallet = response.data.wallet;
                    this.totalActual = this.totalActual + this.wallet.cantidad;

                    this.wallet.cantidad = "";
                    this.wallet.desc  ="";
                    //Close modal
                    $log.debug(response)
                }
            }

        )
    }

}

export const BudgetWalletAddComponent = {
    templateUrl: './views/app/components/budget-wallet-add/budget-wallet-add.component.html',
    controller: BudgetWalletAddController,
    controllerAs: 'vm',
    bindings: {
        walletList:"=",
        productId:"<",
        pbudget:"<",
        userId:"<",
        totalActual:"="
    }
};
