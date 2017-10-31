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
        
    }

    $onChanges(changesObj) { 
        //TODO: revisar evento, actualemnte se ejecuta cada vez que selecciono en product_badgets, 
        //debido a que estamos escuchando la variable pbudget
        if (changesObj.pbudget) {

            console.log('wallets/'+this.userId+"/"+this.productId+"/"+this.pbudget.id)

            //TODO: Cambiar por budgetsproduct
            let Wallets = this.API.one('wallets/'+this.userId+"/"+this.productId+"/"+this.pbudget.id)
            Wallets.get()
              .then((response) => {
                if(!response.error){   
                    this.walletList = response.data.wallets
                    this.total_actual = response.data.total
                    this.limit = this.pbudget.total - this.total_actual
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
        pbudget:"<"
    }
};
