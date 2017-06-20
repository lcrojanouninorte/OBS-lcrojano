class ProjectItemController{
    constructor(API, $log, $state){
        'ngInject';

        //
        this.API = API;
        this.$log = $log;
        this.$state = $state;
        this.originatorEv = {};
    }

    $onInit(){
        this.titulo = this.project.titulo
        this.estado = this.project.estado
        this.id = this.project.id
        this.process_id = this.project.process_id
        this.progress = this.project.progress
        this.pieLabels = ['Ejecutado', 'Pendiente']
        this.chartColours = ["Green",
            "Red"]
        this.pieData = [this.project.progress, 100-this.project.progress]

        
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

export const ProjectItemComponent = {
    templateUrl: './views/app/components/project-item/project-item.component.html',
    controller: ProjectItemController,
    controllerAs: 'vm',
    bindings: {
        project:"<"
    }
}
