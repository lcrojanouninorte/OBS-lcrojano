class ObsDashboardController{
    constructor($auth){
        'ngInject';

        //
        this.$auth = $auth
    }

    $onInit(){

    }
}

export const ObsDashboardComponent = {
    templateUrl: './views/app/components/obs-dashboard/obs-dashboard.component.html',
    controller: ObsDashboardController,
    controllerAs: 'vm',
    bindings: {}
};
