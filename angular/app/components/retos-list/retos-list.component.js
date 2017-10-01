class RetosListController{
    constructor($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API){
        'ngInject';
         this.API = API
        this.$state = $state
        let Challenge = this.API.service('challenges')

        Challenge.getList()
      .then((response) => {
        let dataSet = response.plain()


        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn('desc').withTitle('Reto'),
          DTColumnBuilder.newColumn('fecha_inicio').withTitle('Ini'),
          DTColumnBuilder.newColumn('fecha_fin').withTitle('Fin'),
          DTColumnBuilder.newColumn('estado').withTitle('Estado'),
          DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ]

        this.displayTable = true
          }).catch(function(e){
     a = e
})


          let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

        let actionsHtml = (data) => {
          return `
                    <a class="btn btn-xs btn-warning" ui-sref="app.userrolesedit({roleId: ${data.id}})">
                        <i class="fa fa-edit"></i>
                    </a>
                    &nbsp
                    <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                        <i class="fa fa-trash-o"></i>
                    </button>`
        }
    }

    delete (roleId) {
    let API = this.API
    let $state = this.$state

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      html: false
    }, function () {
      API.one('users').one('roles', roleId).remove()
        .then(() => {
          swal({
            title: 'Deleted!',
            text: 'User Role has been deleted.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            $state.reload()
          })
        })
    })
  }

  $onInit () {}
}

export const RetosListComponent = {
    templateUrl: './views/app/components/retos-list/retos-list.component.html',
    controller: RetosListController,
    controllerAs: 'vm',
    bindings: {}
}
