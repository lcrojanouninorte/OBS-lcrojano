class ProductListController{
    constructor(){
        'ngInject';

        //
        this.add = false;
    }

    $onInit(){
    }

    


}

export const ProductListComponent = {
    templateUrl: './views/app/components/product-list/product-list.component.html',
    controller: ProductListController,
    controllerAs: 'vm',
    bindings: {}
}
