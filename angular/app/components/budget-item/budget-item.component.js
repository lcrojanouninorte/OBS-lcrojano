class BudgetItemController{
    constructor(){
        'ngInject';

        //
        
    }

    $onInit(){
        
    }

    select_budget(){
        this.pbudget.budget_id = this.budget.id;
        this.pbudget.budget_title = this.budget.titulo;
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
