class BudgetFormController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
    }
}

export const BudgetFormComponent = {
    templateUrl: './views/app/components/budget-form/budget-form.component.html',
    controller: BudgetFormController,
    controllerAs: 'vm',
    bindings: {
        parentModel:"="
    }
}
