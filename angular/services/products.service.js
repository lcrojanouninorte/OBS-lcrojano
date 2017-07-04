    export class ProductsService{
    constructor(){
        'ngInject';

        //
        this.API = API
        this.products = []
    }

    add (product) {
    let $auth = this.$auth

    if ($auth.isAuthenticated()) {
    	this.API.all('products').post(product).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    this.$state.reload()
                    swal('Proyecto creado con exito!', '', 'success')

                    this.closeparent();
                    $log.debug(response);


                }
                    
            })

      return UserData.one().get()
    } else {
      return null
    }
  }
}

