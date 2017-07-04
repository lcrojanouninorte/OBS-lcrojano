class ProductBudgetController{
    constructor(WizardHandler){
        'ngInject';

        //
        this.text= "ok"
        this.WizardHandler = WizardHandler;
        

    }

    $onInit(){
 
    }

}

export const ProductBudgetComponent = {
    templateUrl: './views/app/components/product-budget/product-budget.component.html',
    controller: ProductBudgetController,
    controllerAs: 'vm',
    bindings: {
        cancel :"&",
        product:"="
    }
}
