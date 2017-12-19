class BudgetWalletController{
    constructor(API){
        'ngInject';

        //
        this.API = API
        this.walletList = []
        this.total_actual  = 0

    }

    $onInit(){
        //get project and his results.
        let Wallets = this.API.one('wallets/'+this.userId+"/"+this.productId+"/"+this.pbudget.id)
            Wallets.get()
              .then((response) => {
                if(!response.error){   
                    this.walletList = response.data.wallets
                    this.totalActual = response.data.total
                    //this.limit = this.pbudget.total - this.total_actual
                }
            });
    }

    
}

export const BudgetWalletComponent = {
    templateUrl: './views/app/components/budget-wallet/budget-wallet.component.html',
    controller: BudgetWalletController,
    controllerAs: 'vm',
    bindings: {
        productWalletTotal:"=",
        userId:"<",
        productId:"<",
        pbudget:"<"
    }
};
