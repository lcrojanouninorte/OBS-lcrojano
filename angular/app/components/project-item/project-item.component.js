class ProjectItemController{
    constructor(API, $log, $state, AclService,$uibModal){
        'ngInject';

        //
        this.API = API
        this.$log = $log
        this.$state = $state
        this.originatorEv = {}
        this.can = AclService.can
        this.$uibModal =$uibModal
        
    }

    $onInit(){

        this.titulo = this.project.titulo
        this.fecha_inicio = moment(this.project.fecha_inicio).format("DD  MMMM  YYYY");
        this.fecha_fin = moment(this.project.fecha_fin).format("DD  MMMM  YYYY") || "/";  
        this.estado = this.project.estado
        this.id = this.project.id
        this.users = this.project.users
        this.process_id = this.project.process_id
        this.results_total = this.project.results_total
        this.products_total  = this.project.products_total
        this.budgets_total  = this.project.budgets_total
        this.project_wallet_total  = this.project.project_wallet_total


        this.progress = (this.project_wallet_total / this.budgets_total)*100 ||0
        this.chartColours = [ '#4caf50', '#00ADF9' ] 
        this.pieLabels = ['Ejecutado', 'Pendiente']
        this.pieData = [this.progress, (100-this.progress)]
        this.options = {
            responsive: true,
            legend: {
              display: true,
              labels: {
                padding: 20
              },
            }
        }

        

         
    }


    openMenu($mdMenu, ev) {
      this.originatorEv = ev;
      $mdMenu.open(ev);
    };

    changeState(){
      this.cambiarEstado = true
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
      //closeOnConfirm: false,
      //showLoaderOnConfirm: true,
      html: false
    }).then(function () {
      API.one('projects').one('', projectId).remove()
        .then((response) => {
            if(!response.error){
              swal({
                title: 'Borrado!',
                text: 'Se ha borrado el proyecto con exito.',
                type: 'success',
                confirmButtonText: 'OK',
                //closeOnConfirm: true
              }).then( function () {
                $state.reload()
              })
            }
            else{
                this.$log.debug(response);
            }
        })
    
  })
}

edit_project() {
        let $uibModal = this.$uibModal
        let project = this.project
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalProject.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'md',
            resolve: {
               project: function() {
                   return project;
               }
            }

        })
    }

    modalcontroller($uibModalInstance, project) {
        'ngInject'
        this.project = project
       
        this.ok = () => {
          $uibModalInstance.close($scope.selected.item)
        }

        this.cancel = () => {

          $uibModalInstance.dismiss('cancel');
        }
  }


}

export const ProjectItemComponent = {
    templateUrl: './views/app/components/project-item/project-item.component.html',
    controller: ProjectItemController,
    controllerAs: 'vm',
    bindings: {
        project:"<"
    }
}
