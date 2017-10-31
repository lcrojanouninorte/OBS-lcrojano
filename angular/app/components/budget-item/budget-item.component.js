class BudgetItemController{
    constructor(){
        'ngInject';

        //
        
    }

    $onInit(){
        
    }

    select_budget(){
        this.pbudget = this.budget;

    }
}

export const BudgetItemComponent = {
    templateUrl: './views/app/components/budget-item/budget-item.component.html',
    controller: BudgetItemController,
    controllerAs: 'vm',
    bindings: {
        budget:"=",
        pbudget : "="
    }
}
