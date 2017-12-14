class ProductBudgetController{
    constructor(WizardHandler, API,$scope, $state){
        'ngInject';

        //
        this.text= "ok"
        this.WizardHandler = WizardHandler
        this.productBudget ={}
        this.$scope = $scope
        this.API = API

        this.users=this.$scope.$parent.mvm.users
        this.$state = $state
        this.loadWallet = false
        this.selectedBudget = {}
        this.step = 0;
        //this.$state = $state

    }

    $onInit(){

        //Calc product total from product budget array

        

    }
    isEditing(){
        //1. Add, 2. Edit
        return this.mode == 2? true:false;
    }
    isAdding(){
        //1. Add, 2. Edit
        return this.mode == 1? true:false;
    }

    budget_desc_ready(){
        return (this.productBudget.budget_id != '')
    }
    current_step(){
        return this.WizardHandler.wizard().currentStepNumber();
    }

    finishedWizard(form) {
        if (true) {
            this.productBudget.user_id =  this.users[0].id
            this.productBudget.product_id=this.product.id
            this.productBudget.budget_id =this.productBudget.id
            this.API.all('product/budgets').post(this.productBudget).then((response) => {
                if(response.errors){
                    $log.debug(response)
                }else{
                    this.$state.reload()
                    this.WizardHandler.wizard().goTo(0);
                   
                    swal('Presupuesto añadido con exito!', '', 'success')

                   // this.cancel();
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
        mode:"<",
       
    }
}
