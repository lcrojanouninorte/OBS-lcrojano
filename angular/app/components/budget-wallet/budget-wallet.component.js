class BudgetWalletController{
    constructor(API){
        'ngInject';

        //
        this.API = API
        this.walletList = []
    }

    $onInit(){
        //get project and his results.
        
    }

    $onChanges(changesObj) { 
        //TODO: no ejecutar si no ha cambiado el objeto
        if (changesObj.budgetId) {
            let Wallets = this.API.one('wallets/'+this.userId+"/"+this.productId+"/"+this.budgetId)
            Wallets.get()
              .then((response) => {
                if(!response.error){   
                    this.walletList = response.data.wallets
                }
            });
        }
    }
}

export const BudgetWalletComponent = {
    templateUrl: './views/app/components/budget-wallet/budget-wallet.component.html',
    controller: BudgetWalletController,
    controllerAs: 'vm',
    bindings: {
        userId:"<",
        productId:"<",
        budgetId:"<"
    }
};
