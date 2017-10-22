class BudgetWalletListController{
    constructor(API){
        'ngInject';

        //

         this.API = API
         this.wallet = [];
    }

    $onInit(){

                  
    }
}

export const BudgetWalletListComponent = {
    templateUrl: './views/app/components/budget-wallet-list/budget-wallet-list.component.html',
    controller: BudgetWalletListController,
    controllerAs: 'vm',
    bindings: {
        walletList:"="
    }
};
