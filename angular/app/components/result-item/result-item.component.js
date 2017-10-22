class ResultItemController{
    constructor(API, $scope,AclService, $state){
        'ngInject';

        //
        this.API = API
        this. $scope = $scope;
        this.can = AclService.can
        this.hasRole = AclService.hasRole
        this.$state = $state
    }

    $onInit(){
        let result = this.result

        result.total  = 0 
        result.fecha_fin = "1000-01-28"
        
        //Calcular totales y fecha final
        angular.forEach(result.products, function(product, key) {
          product.total = 0;

          var startTime = new Date(result.fecha_fin+"T04:00:00.000Z");
          var endTime = new Date(product.fecha_fin+"T04:00:00.000Z");

          //Colocar la mayor fecha final de los productos

          if(startTime<endTime){
            result.fecha_fin = product.fecha_fin
          }


          angular.forEach(product.budgetproducts, function(budget, key) {
            product.total = product.total + (budget.cantidad * budget.valor_unitario);
          });
          result.total = result.total + product.total;
        });
        
    }

    delete (resultId) {
    let API = this.API
    let $state = this.$state

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
     API.one('results',resultId).remove()
        .then((response) => {
            if(!response.error){
              swal({
                title: 'Borrado!',
                text: 'Se ha borrado el proyecto con exito.',
                type: 'success',
                confirmButtonText: 'OK',
                closeOnConfirm: true
              }).then(function () {
                $state.reload()
              })

            }else{
                this.$log.debug(response);
            }
        })
    })
  }

  update(){
        this.API.all('result/check').post(this.result).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    //this.$state.reload()
                    //swal('Proyecto actualizado con exito!', '', 'success')

                    //this.closeparent();
                    $log.debug(response);


                }
                    
            })
    }
}

export const ResultItemComponent = {
    templateUrl: './views/app/components/result-item/result-item.component.html',
    controller: ResultItemController,
    controllerAs: 'vm',
    bindings: {
        result:"="
    }
}
