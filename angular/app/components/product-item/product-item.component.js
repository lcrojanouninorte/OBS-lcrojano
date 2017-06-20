class ProductItemController{
    constructor(){
        'ngInject';

        //
        this.done = false
        this.checkValues = [false, true, null]
        this.len = this.checkValues.length
        this.index = 0
        this.checkModel = this.checkValues[this.index]
       
    }

    $onInit(){
         this.nombre = this.product.nombre
    }

    checkModelChange() {
        this.checkModel = this.checkValues[++this.index % this.len];
    }
}

export const ProductItemComponent = {
    templateUrl: './views/app/components/product-item/product-item.component.html',
    controller: ProductItemController,
    controllerAs: 'vm',
    bindings: {
        product:"<"
    }
}
