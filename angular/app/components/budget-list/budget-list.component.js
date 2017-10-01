class BudgetListController{
    constructor(API, $state){
        'ngInject';

        //
        this.API = API
        this.$state = $state
        this.budget = [ ]
       /* 
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
        */
    }

    $onInit(){
         

          //get project and his results.
        let Budgets = this.API.one('budgets', this.product.id)
        Budgets.get()
          .then((response) => {
            if(!response.error){   
                this.budget = response.data.budgets
            }
        });

    }


}

export const BudgetListComponent = {
    templateUrl: './views/app/components/budget-list/budget-list.component.html',
    controller: BudgetListController,
    controllerAs: 'vm',
    bindings: {
        product:"=",
        parentModel : "="
    }
}
