class ProductBudgetController{
    constructor(WizardHandler, API,$scope, $state){
        'ngInject';

        //
        this.text= "ok"
        this.WizardHandler = WizardHandler
        this.productBudget ={}
        this.$scope = $scope
        this.API = API

        this.users=this.$scope.$parent.mvm.users;
        this.$state = $state

    }

    $onInit(){

    }

    finishedWizard(form) {
        if (true) {
            this.productBudget.user_id =  this.users[0].id
            this.productBudget.product_id=this.product.id
            this.API.all('product/budgets').post(this.productBudget).then((response) => {
                if(response.errors){
                    $log.debug(response)
                }else{
                    this.$state.reload()
                    swal('Presupuesto añadido con exito!', '', 'success')

                    this.cancel();
                    $log.debug(response);


                }
                    
            })
        }else{
            alert("Revisar formulario");
        }


    }

}

export const ProductBudgetComponent = {
    templateUrl: './views/app/components/product-budget/product-budget.component.html',
    controller: ProductBudgetController,
    controllerAs: 'vm',
    bindings: {
        cancel :"&",
        product:"<",
        users:"<",
       
    }
}
