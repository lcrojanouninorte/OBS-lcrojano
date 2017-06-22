class BudgetListController{
    constructor(){
        'ngInject';

        //
        
    }

    $onInit(){
        this.budget = [
            {icon_id : 1, titulo:"Rubro tipo 1"},
            {icon_id : 1, titulo:"Rubro tipo 1"},
            {icon_id : 1, titulo:"Rubro tipo 1"},
            {icon_id : 1, titulo:"Rubro tipo 1"},
            {icon_id : 2, titulo:"Rubro tipo 2"},
            {icon_id : 2, titulo:"Rubro tipo 2"},
            {icon_id : 2, titulo:"Rubro tipo 2"},
            {icon_id : 2, titulo:"Rubro tipo 2"},
            {icon_id : 3, titulo:"Rubro tipo 3"},
            {icon_id : 3, titulo:"Rubro tipo 3"},
            {icon_id : 3, titulo:"Rubro tipo 3"},
            {icon_id : 3, titulo:"Rubro tipo 3"},
            {icon_id : 4, titulo:"Rubro tipo 4"},
            {icon_id : 4, titulo:"Rubro tipo 4"},
            {icon_id : 4, titulo:"Rubro tipo 4"},
            {icon_id : 4, titulo:"Rubro tipo 4"},
            {icon_id : 5, titulo:"Rubro tipo 5"},


        ]
    }
}

export const BudgetListComponent = {
    templateUrl: './views/app/components/budget-list/budget-list.component.html',
    controller: BudgetListController,
    controllerAs: 'vm',
    bindings: {
        product:"="
    }
}
