class ProductFormController{
    constructor(){
        'ngInject';

        //
        this.product = {}
    }

    $onInit(){
    }

    add(){
        //Products.add(this.product);
    }
}

export const ProductFormComponent = {
    templateUrl: './views/app/components/product-form/product-form.component.html',
    controller: ProductFormController,
    controllerAs: 'vm',
    bindings: {}
}
