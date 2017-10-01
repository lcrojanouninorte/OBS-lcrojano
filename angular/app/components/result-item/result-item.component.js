class ResultItemController{
    constructor(API, $scope){
        'ngInject';

        //
        this.API = API
        this. $scope = $scope;
    }

    $onInit(){
        //get project and his results.
        let Project = this.API.one('result', this.result.id)
        Project.get()
          .then((response) => {
            if(!response.error){   
                this.result = this.results
            }
        });
    }

        delete (projectId) {
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
    }, function () {
      API.one('projects').one('', projectId).remove()
        .then((response) => {
            if(!response.error){
              swal({
                title: 'Borrado!',
                text: 'Se ha borrado el proyecto con exito.',
                type: 'success',
                confirmButtonText: 'OK',
                closeOnConfirm: true
              }, function () {
                $state.reload()
              })

            }else{
                this.$log.debug(response);
            }
        })
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
