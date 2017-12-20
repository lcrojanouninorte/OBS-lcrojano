class ProductFormController {
    constructor(API, $state, $log) {
        'ngInject';

        //
        this.API = API
        this.$log = $log
        this.product = null
        this.isEditing = false
        this.$state = $state
        this.results = null
        this.result = null
        this.options = {
            applyClass: 'btn-green',
            singleDatePicker: true,
            locale: {
                applyLabel: "Aplicar",
                fromLabel: "Desde",
                format: "D MMM YYYY", //will give you 2017-01-06
        //format: "D-MMM-YY", //will give you 6-Jan-17
        //format: "D-MMMM-YY", //will give you 6-January-17
            toLabel: "al",
            cancelLabel: 'Cancelar'
          } 
        }
       /* this.options = {
            applyClass: 'btn-green',
            locale: {
                applyLabel: "Aplicar",
                fromLabel: "Desde",
                format: "D MMM YYYY", //will give you 2017-01-06
                //format: "D-MMM-YY", //will give you 6-Jan-17
                //format: "D-MMMM-YY", //will give you 6-January-17
                toLabel: "al",
                cancelLabel: 'Cancelar',
                customRangeLabel: 'Custom range'
            }
        }*/


    }


$onInit() {

    //cargar todos los resultados para el select!

    if(this.product==null){
        this.isEditing = false
        this.product = {
            "fecha_inicio":  new Date(), 
            "fecha_fin": new Date(),
            "desc" :""
        }
    }else{
        this.isEditing = true
    }
}

    loadResults(){
        let Results = this.API.one('results', this.projectId)

        Results.getList().then((response) => {
            if(!response.error){
                this.results = response
            }
          });
    }

    add(){//add item from form controller

        //Check if it is an update

        if(this.isEditing){
            //Cambiar de reusltado si se ha cambado
            if(this.result.id){

                this.product.result_id = this.result.id
            }
            this.API.service('products').post(this.product).then((response) => {
                    if(response.errors){
                       this.$log.debug(response);
                    }else{
                       
                        swal('Producto editado con exito!', '', 'success')
                        this.$state.reload()
                        this.cancel()
                        this.$log.debug(response)
                    }
            })
        }else{

            
            let new_product = {
                "desc":this.product.desc,
                "fecha_inicio": moment(this.product.fecha_inicio).format("YYYY/MM/DD") ,
                "fecha_fin": moment(this.product.fecha_fin).format("YYYY/MM/DD"),
                "checkEmpresario":3
            }
            new_product.result_id=this.resultId;
            this.API.service('products').post(new_product).then((response) => {
                    if(response.errors){
                        $log.debug(response);
                    }else{
                       
                        swal('Producto creado con exito!', '', 'success')
                        this.$state.reload()
                        this.productList.push(response.data.product)
                        this.cancel()
                        $log.debug(response)
                    }
            })
        }


        
    }
 
}


export const ProductFormComponent = {
    templateUrl: './views/app/components/product-form/product-form.component.html',
    controller: ProductFormController,
    controllerAs: 'vm',
    bindings: {
        resultId: "<?",
        projectId: "<",
        productList: "=",
        product: "=?",
        cancel:"&?"
 
    }
}
