class NavHeaderController {
  constructor ($rootScope, ContextService,AclService, $auth, $mdMenu) {
    'ngInject'

    let navHeader = this
    this.$mdMenu =$mdMenu
    this.can = AclService.can
    this.isAsesor = AclService.hasRole("asesor");
    this.isEmpresario = AclService.hasRole("empresario");
    this.isLogged = $auth.isAuthenticated()

    ContextService.me(function (data) {
      navHeader.userData = data
    })
  }

  $onInit () {}
}

export const NavHeaderComponent = {
  templateUrl: './views/app/components/nav-header/nav-header.component.html',
  controller: NavHeaderController,
  controllerAs: 'vm',
  bindings: {}
}
