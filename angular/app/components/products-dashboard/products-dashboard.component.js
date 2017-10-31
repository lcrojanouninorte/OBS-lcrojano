class ProductsDashboardController{
    constructor($stateParams,API,AclService){
        'ngInject';

        //
        this.project_id = $stateParams.projectId
        this.date = $stateParams.date
        this.API = API
        this.products = []
    }

    $onInit(){
        
        //get project and his results.
        let Products = this.API.one('project', this.project_id).one('products', this.date)
        Products.get()
          .then((response) => {
            if(!response.error){   
                this.products = response.data.products
            }
        });
    }
}

export const ProductsDashboardComponent = {
    templateUrl: './views/app/components/products-dashboard/products-dashboard.component.html',
    controller: ProductsDashboardController,
    controllerAs: 'vm',
    bindings: {}
};
