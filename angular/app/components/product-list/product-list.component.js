class ProductListController{
    constructor(){
        'ngInject';

        //
        this.add = false
        this.isCollapsed=true
        this.products =[
        {nombre:"Producto 1"},
        {nombre:"Producto 2"},
        {nombre:"Producto 3"},
        {nombre:"Producto 4"},
        {nombre:"Producto 5"},

        ];
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
