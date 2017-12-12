class ResultFormController{
 constructor(API, $auth, ContextService, WizardHandler, $log, $state,$stateParams){
        'ngInject';
        this.API = API
        this.$log = $log
        this.WizardHandler = WizardHandler
        this.$state= $state;
        this.project_id = $stateParams.projectId
        this.result = null;
        this.isEditing = false;
        

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
        if(this.result ==null){
            this.result = {
              titulo: '',
              desc: '',
              user_id: "",
              process_id: 1,
              fecha_inicio:""
            };
            this.isEditing = false;  
        }else{
            this.isEditing = true;
        }
    }

    finishedWizard(form) {
        if (form.$valid) {
            if(this.isEditing){

            }else{
                this.result.user_id=this.userData.id;
                this.result.project_id=this.project_id;
            }

            this.API.all('results').post(this.result).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    this.$state.reload()
                    swal('Resultado creado/editado con exito!', '', 'success')

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

export const ResultFormComponent = {
    templateUrl: './views/app/components/result-form/result-form.component.html',
    controller: ResultFormController,
    controllerAs: 'vm',
    bindings: {
        "closeparent" : "&",
        result: "=?"
 
    }
}
