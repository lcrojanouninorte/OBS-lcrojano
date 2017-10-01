class ProductFormController {
    constructor(API) {
        'ngInject';

        //
        this.API = API
        this.product = {
            dates : {"startDate": null, "endDate": null}
        }
         
        this.options = {
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
        }


    }


$onInit() {
}

    add(){//add item from form controller

        
        let new_product = {
            "desc":this.product.desc,
            "fecha_inicio": moment(this.product.dates.startDate).format("YYYY/MM/DD") ,
            "fecha_fin": moment(this.product.dates.endDate).format("YYYY/MM/DD"),
            "estado":false
        }

        new_product.result_id=this.resultId;
        this.API.service('products').post(new_product).then((response) => {
                if(response.errors){
                    $log.debug(response);
                }else{
                   // this.$state.reload()
                   // swal('Producto creado con exito!', '', 'success')
                    this.productList.push(response.data.product)
                    $log.debug(response)
                }
            }

        )
    }
 
}


export const ProductFormComponent = {
    templateUrl: './views/app/components/product-form/product-form.component.html',
    controller: ProductFormController,
    controllerAs: 'vm',
    bindings: {
        resultId: "<",
        productList: "="
 
    }
}
