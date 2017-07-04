class MdSliderPipsController{
    constructor(){
        'ngInject';

        //
        this.value = 0;
    }

    $onInit(){
        this.value = JSON.parse(this.value);
    }
}

export const MdSliderPipsComponent = {
    templateUrl: './views/app/components/md-slider-pips/md-slider-pips.component.html',
    controller: MdSliderPipsController,
    controllerAs: 'vm',
    bindings: {
        value:"="
    }
}
