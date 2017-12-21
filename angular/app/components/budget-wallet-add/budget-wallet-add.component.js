class BudgetWalletAddController{
    constructor(API, $state){
        'ngInject';

        //

        this.API = API
        this.$state = $state
        this.wallet = {}
        this.wallets = {}
 
    }

    $onInit(){

        //get total by type
        this.wallets=this.pbudget.wallets 
        //En la posicion 0: sena, 1: cp, 2: ce, bienen de un order by de la ruta 
        //http://localhost:8000/api/budgets/1/products/53

     



    }
    add(){//add item from form controller

        
        let new_wallet = {
            "desc":this.wallet.desc,
            "type":this.wallet.type,
            "doc":this.wallet.doc,
            "cantidad": this.wallet.cantidad,
            "product_id": this.productId,
            "budget_product_id": this.pbudget.id, //Cambiar por BudgetProduct
            "user_id": this.userId

        }
        this.API.service('wallets').post(new_wallet).then((response) => {
                if(response.errors){
                    $log.debug(response);
                }else{
                   
                    swal('Gasto asignado con exito!', '', 'success')
                   // this.$state.reload()
                    this.walletList.push(angular.copy(response.data.wallet))
                    this.wallet = response.data.wallet;
                    this.totalActual = parseInt(this.totalActual) + parseInt(this.wallet.cantidad)

                    //actualizar producto principal!
                    this.productWalletTotal = parseInt(this.productWalletTotal) + parseInt(this.wallet.cantidad)

                    //actualizar segun tipo 
                        //Si no se ha ingresado gastos de algun tipo hay que crear un modelo local, esto es solo para visualizar en tiempo real los cambios....
                    if(!this.pbudget.wallets_executed[this.wallet.type]){
                        this.pbudget.wallets_executed[this.wallet.type] = {
                            "type" : this.wallet.type,
                            "total_executed" : 0
                        }
                    }
                     this.pbudget.wallets_executed[this.wallet.type].total_executed =parseInt(this.pbudget.wallets_executed[this.wallet.type].total_executed) + parseInt(this.wallet.cantidad)

                    
                    this.wallet.cantidad = "";
                    this.wallet.desc  ="";
                    this.wallet.type  ="";
                    this.wallet.doc  ="";
                    //Close modal
                    $log.debug(response)
                }
            }

        )
    }
 

}

export const BudgetWalletAddComponent = {
    templateUrl: './views/app/components/budget-wallet-add/budget-wallet-add.component.html',
    controller: BudgetWalletAddController,
    controllerAs: 'vm',
    bindings: {
        productWalletTotal:"=",
        walletList:"=",
        productId:"<",
        pbudget:"=",
        userId:"<",
        totalActual:"="
    }
};
