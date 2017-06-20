class ProjectFormController{
    constructor(API, $auth, ContextService, WizardHandler, $log, $state){
        'ngInject';
        this.API = API;
        this.$log = $log;
        this.WizardHandler = WizardHandler;
        this.$state= $state;

        let navHeader = this

        ContextService.me(function (data) {
          navHeader.userData = data
        })

       
    }

    $onInit(){
         this.project = {
          titulo: '',
          desc: '',
          user_id: "",
          process_id: 1
        };
    }

    finishedWizard(form) {
        if (form.$valid) {
            this.project.user_id=this.userData.id;
            this.API.all('projects').post(this.project).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    this.$state.reload()
                    swal('Proyecto creado con exito!', '', 'success')

                    this.closeparent();
                    $log.debug(response);


                }
                    
            })
        }else{
            alert("Revisar formulario");
        }


    }


    exitValidation(input){
        return angular.equals({}, input);
    };
}

export const ProjectFormComponent = {
    templateUrl: './views/app/components/project-form/project-form.component.html',
    controller: ProjectFormController,
    controllerAs: 'vm',
    bindings: {
        "closeparent" : "&"
    }
}
