class BudgetListController{
    constructor(API, $state){
        'ngInject';

        //
        this.API = API
        this.$state = $state
        this.budget = [ ]
        this.filter = false;
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
         if(this.desc){//Este es cuando se elije un desc_rubro
              //get all budges deagregated.
       
            let Budgets = this.API.one('budgets', this.pbudget.id).one('products', this.product.id)
            Budgets.get()
              .then((response) => {
                if(!response.error){   
                    this.budget = response.data.budgets
                }
            });
         }else{
              //get budges sumarized.
            let Budgets = this.API.one('budgets', this.product.id)
            Budgets.get()
              .then((response) => {
                if(!response.error){   
                    this.budget = response.data.budgets
                }
            });
         }

    }

    hasBudget(item){
        return item.budgetproducts.length>0
    }


}

export const BudgetListComponent = {
    templateUrl: './views/app/components/budget-list/budget-list.component.html',
    controller: BudgetListController,
    controllerAs: 'vm',
    bindings: {
        product:"=",
        pbudget : "=",
        filter:"<",
        desc:"<"//true false
    }
}
