class ResultItemController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){
    }
}

export const ResultItemComponent = {
    templateUrl: './views/app/components/result-item/result-item.component.html',
    controller: ResultItemController,
    controllerAs: 'vm',
    bindings: {
        result:"="
    }
}
