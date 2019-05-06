export class ProjectCreateDialogController{
    constructor(DialogService){
        'ngInject';

        this.DialogService = DialogService;
    }

    save(){
        //Logic here
        this.DialogService.hide();
    }

    show(){
        this.DialogService.show();
    }

    cancel(){
        this.DialogService.cancel();
    }
}

