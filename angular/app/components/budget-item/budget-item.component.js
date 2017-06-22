class BudgetItemController{
    constructor(){
        'ngInject';

        //
         
    }

    $onInit(){
        
    }
}

export const BudgetItemComponent = {
    templateUrl: './views/app/components/budget-item/budget-item.component.html',
    controller: BudgetItemController,
    controllerAs: 'vm',
    bindings: {
        budget:"="
    }
}
