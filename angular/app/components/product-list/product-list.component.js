class ProductListController{
    constructor(API, $state, $scope,AclService){
        'ngInject';

        //
        //this.add = false
        this.isCollapsed=true
        this.products =[]
        this.API = API
        this.$state = $state
        this.$scope  = $scope
        this.can = AclService.can
       // this.dates = {"startDate": null, "endDate": null}
       // this.desc =""
    }

    $onInit(){

    }



    delete (product_id, index) {
        let API = this.API
        let deleted = false
        let $state = this.$state
        let Products = this.products
        let Index = index
    
     
        swal({
          title: 'Seguro?',
          text: 'No sera posible recuperar estos datos!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: 'Si Quiero borrarlo!',
          closeOnConfirm: false,
          showLoaderOnConfirm: true,
          html: false
        }).then(function () {

          API.one('products',product_id).remove()
            .then((response) => {
                if(!response.error){
                    //$state.reload()
                  Products.splice(Index, 1);
                  swal({
                    title: 'Borrado!',
                    text: 'Se ha borrado el proyecto con exito.',
                    type: 'success',
                    confirmButtonText: 'OK',
                    closeOnConfirm: true
                  }).then( function () {
                    
                   this.$state.reload()
                   
                    
                  })

                }else{
                    this.$log.debug(response);
                }
            }
            )
        })
        
  }


}

export const ProductListComponent = {
    templateUrl: './views/app/components/product-list/product-list.component.html',
    controller: ProductListController,
    controllerAs: 'vm',
    bindings: {
        projectId:"<?",
        resultId:"<",
        products:"<"
    }
}
