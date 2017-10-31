class BudgetWalletAddController{
    constructor(API, $state){
        'ngInject';

        //

        this.API = API
        this.$state = $state
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
                    this.walletList.push(response.data.wallet)
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
        walletLimit:"<"
    }
};
