class MilestonesListController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
    }
}

export const MilestonesListComponent = {
    templateUrl: './views/app/components/milestones-list/milestones-list.component.html',
    controller: MilestonesListController,
    controllerAs: 'vm',
    bindings: {
        milestonesList:"<"
    }
};
