class ActividadesItemController{
    constructor($uibModal){
        'ngInject';

        //
        this.$uibModal = $uibModal
        this.actividades={empresario:{done:false}}
    	this.actividades={asesor:{done:false}}
    }

    $onInit(){

    }


    open_budget(actividad_id) {

        let $uibModal = this.$uibModal
        
        let actividad = this.actividad

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: "projectBudgetModal.html",
            controller: this.modalcontroller ,
            controllerAs: 'mvm',
            size: 'lg',
            resolve: {
               actividad: function() {
                   return actividad;
               }
            }
        })
    }

    modalcontroller($uibModalInstance, actividad) {
        'ngInject'
        this.actividad = actividad
        this.ok = () => {

          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }
}

export const ActividadesItemComponent = {
    templateUrl: './views/app/components/actividades-item/actividades-item.component.html',
    controller: ActividadesItemController,
    controllerAs: 'vm',
    bindings: {
        actividad: '=',
        delete:"&"
    },
    selector: 'actividad-item'
};
