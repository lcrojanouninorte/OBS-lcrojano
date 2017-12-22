class BudgetItemController{
    constructor(API, $state, WizardHandler, AclService){
        'ngInject';

        //
        this.API = API
        this.$state = $state
        this.WizardHandler = WizardHandler
        this.can = AclService.can

        
    }

    $onInit(){
        
    }

    select_budget(){
        this.pbudget = this.budget;

    }

    delete (budget_item) {
            let API = this.API
            let $state = this.$state
            let budgetList = this.budgetList
            let vm = this
            let WizardHandler = this.WizardHandler
 


            swal({
              title: 'Seguro?',
              text: 'No sera posible recuperar estos datos!',
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Si Quiero borrarlo!',
              //closeOnConfirm: false,
              //showLoaderOnConfirm: true,
              html: false
            }).then(function () {

              API.one('budgets').one('', budget_item.id).remove()
                .then((response) => {
                    if(!response.error){

                          //vm.totalActual = vm.totalActual - budget_item.cantidad;
                          vm.product.budgets_total = vm.product.budgets_total - budget_item.total
                          budgetList.splice( budgetList.indexOf(budget_item), 1 )
                          WizardHandler.wizard().goTo(0)
                      swal({
                        title: 'Borrado!',
                        text: 'Se ha borrado el gasto con exito.',
                        type: 'success',
                        confirmButtonText: 'OK',
                        //closeOnConfirm: true
                      }).then( function () {

                        
                        //totalActual = totalActual - wallet_item.cantidad;
                        //$state.reload()
                      })
                    }
                    else{
                        this.$log.debug(response);
                    }
                })
            
          })
        }
}

export const BudgetItemComponent = {
    templateUrl: './views/app/components/budget-item/budget-item.component.html',
    controller: BudgetItemController,
    controllerAs: 'vm',
    bindings: {
        budget:"=",
        pbudget : "=",
        budgetList :"=",
        product:"=?"
    }
}
