class UserListsController {
  constructor ($scope, $state, $compile, DTOptionsBuilder, DTColumnBuilder, API,$uibModal) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$uibModal =$uibModal

    let Users = this.API.service('users')

    Users.getList()
      .then((response) => {
        let dataSet = response.plain()

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()

        this.dtColumns = [
         // DTColumnBuilder.newColumn('id').withTitle('ID'),
          DTColumnBuilder.newColumn('name').withTitle('Name'),
          DTColumnBuilder.newColumn('email').withTitle('Email'),
          DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="app.useredit({userId: ${data.id}})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete(${data.id})">
                    <i class="fa fa-trash-o"></i>
                </button>`
    }
  }


  delete (userId) {
    let API = this.API
    let $state = this.$state

    swal({
        title: 'Seguro?',
        text: 'No será prosible recuperar el usuario!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Si, Borrarlo!',
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        html: false
    }).then(function() {
        API.one('users').one('user', userId).remove()
            .then(function(data) {
                swal({
                    title: 'Borrado!',
                    text: 'User ha sido borrado.',
                    type: 'success',
                    confirmButtonText: 'OK',
                    closeOnConfirm: true
                }).then(function() {
                    $state.reload()
                })
            })
    })

  }


      addUser() {
        let $uibModal = this.$uibModal
        let items = this.items

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'adduser.html',
            controller: this.modalcontroller,
            controllerAs: 'mvm',
            size: 'sm'
        })
    }

    modalcontroller ($uibModalInstance) {
    'ngInject'
    this.ok = () => {

      $uibModalInstance.close($scope.selected.item)
    }

    this.cancel = () => {

      $uibModalInstance.dismiss('cancel');
      

     
    }
  }

  $onInit () {}
}

export const UserListsComponent = {
  templateUrl: './views/app/components/user-lists/user-lists.component.html',
  controller: UserListsController,
  controllerAs: 'vm',
  bindings: {}
}
