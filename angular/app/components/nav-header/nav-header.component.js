class NavHeaderController {
  constructor ($rootScope, ContextService,AclService) {
    'ngInject'

    let navHeader = this
     this.can = AclService.can
    this.isAsesor = AclService.hasRole("asesor");
    this.isEmpresario = AclService.hasRole("empresario");

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
