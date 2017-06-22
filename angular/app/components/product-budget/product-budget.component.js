class ProductBudgetController{
    constructor(){
        'ngInject';

        //
        this.text= "ok"
        

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
