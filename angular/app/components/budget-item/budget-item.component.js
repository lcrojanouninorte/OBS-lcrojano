class BudgetItemController{
    constructor(){
        'ngInject';

        //
        
    }

    $onInit(){
        
    }

    select_budget(){
        this.parentModel = this.budget.id;
    }
}

export const BudgetItemComponent = {
    templateUrl: './views/app/components/budget-item/budget-item.component.html',
    controller: BudgetItemController,
    controllerAs: 'vm',
    bindings: {
        budget:"=",
        parentModel : "="
    }
}
