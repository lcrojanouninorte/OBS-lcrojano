class NavHeaderController {
    constructor($rootScope, ContextService, AclService, $auth, $mdDialog) {
        'ngInject'

        let navHeader = this
        this.$mdDialog = $mdDialog
        this.can = AclService.can
        this.isAsesor = AclService.hasRole("asesor");
        this.isEmpresario = AclService.hasRole("empresario");
        this.isLogged = $auth.isAuthenticated()

        ContextService.me(function(data) {
            navHeader.userData = data
        })
    }

    navigateTo(to, event) {
        window.open(to, "_blank");

    };
    $onInit() {}

    show_dialog(ev, selector) {
        this.$mdDialog.show({
            contentElement: selector,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true,
        });
    }
}

export const NavHeaderComponent = {
    templateUrl: './views/app/components/nav-header/nav-header.component.html',
    controller: NavHeaderController,
    controllerAs: 'vm',
    bindings: {}
}