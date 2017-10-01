class ProjectFormController{
    constructor(API, $auth, ContextService, WizardHandler, $log, $state){
        'ngInject';
        this.API = API
        this.$log = $log
        this.WizardHandler = WizardHandler
        this.$state= $state
        this.users = null
        this.user = null
     
        let navHeader = this

        ContextService.me(function (data) {
          navHeader.userData = data
        })

         this.options = {
        applyClass: 'btn-green',
         singleDatePicker: true,
        locale: {
            applyLabel: "Aplicar",
            fromLabel: "Desde",
            format: "D MMM YYYY", //will give you 2017-01-06
    //format: "D-MMM-YY", //will give you 6-Jan-17
    //format: "D-MMMM-YY", //will give you 6-January-17
        toLabel: "al",
        cancelLabel: 'Cancelar'
      } 
    }

       
    }

    $onInit(){
         this.project = {
          titulo: '',
          desc: '',
          user_id: "",
          process_id: 1,
          fecha_inicio:""
        };
      //  this.loadUsers();

    }
    loadUsers(){
        let Users = this.API.one('users',"empresario")

        Users.getList().then((response) => {
            if(!response.error){
                this.users = response
            }
          }).catch(this.failedRegistration.bind(this))
    }
    failedRegistration (response) {
    if (response.status === 422) {
      for (var error in response.data.errors) {
        this.errors[error] = response.data.errors[error][0]
        this.$scope.registerForm[error].$invalid = true
        this.closeparent();
      }
    }
  }

    finishedWizard(form) {
        if (form.$valid) {
            this.project.user_id=this.userData.id;
            this.project.empresario_id=this.user;
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
