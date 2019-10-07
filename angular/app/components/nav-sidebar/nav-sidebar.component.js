class NavSidebarController {
  constructor (AclService, ContextService, $window, $state) {
    'ngInject'

    let navSideBar = this
    this.can = AclService.can
    this.isAdmin = AclService.hasRole("admin.user");
    this.isSuperAdmin = AclService.hasRole("admin.super");
    this.$window = $window
    this.$state =$state
    this.ContextService =ContextService

    ContextService.me(function (data) {
      navSideBar.userData = data
    })

    var hders = {
      'Content-Type': 'application/json',
    }
    var token = this.$window.localStorage.satellizer_token
      if (token) {
        hders.Authorization = 'Bearer ' + token
    }
  }

  $onInit () {}

  open_file_manager(){
    var url = this.ContextService.baseUrl+"/obs-file-manager"
    this.$window.open(url,'_blank');
  }
}

export const NavSidebarComponent = {
  templateUrl: './views/app/components/nav-sidebar/nav-sidebar.component.html',
  controller: NavSidebarController,
  controllerAs: 'vm',
  bindings: {}
}
