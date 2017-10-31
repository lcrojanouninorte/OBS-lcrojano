class ResultItemController{
    constructor(API, $scope,AclService, $state,$uibModal){
        'ngInject';

        //
        this.API = API
        this. $scope = $scope;
        this.can = AclService.can
        this.hasRole = AclService.hasRole
        this.$state = $state
        this.$uibModal =$uibModal
    }

    $onInit(){
        let result = this.result
        
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

    //FILE UPLOAD MODAL
    upload_modal() {
        let $uibModal = this.$uibModal
        let result = this.result

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "UploadModal.html",
            controller: this.modalcontroller ,
            controllerAs: 'mvm',
            size: 'sm',
            resolve: {
               result: function() {
                   return result;
               }
            }
        })
    }

    modalcontroller($uibModalInstance, result) {
        'ngInject'
        this.result = result
       
        this.ok = () => {
          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
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
