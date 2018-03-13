class BotFormController{
    constructor(API, $auth, ContextService, WizardHandler, $log, $state, $mdpTimePicker, $mdpDatePicker,moment){
        'ngInject';

        //
        this.API = API
        this.moment =moment
        this.$log = $log
        this.WizardHandler = WizardHandler
        this.$state= $state
        this.users = null
        this.user = null
        this.isEditing=false
        this.mode = "project"
        this.$mdpTimePicker = $mdpTimePicker
        this.$mdpDatePicker = $mdpDatePicker
        this.currentDate = new Date();
        this.bot = {
            active:1
        }
 
     
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

        //Todo: Cargar de la base de datos
        this.cities = [
            { "id": 1, "name" :  "Remorques en Direct Qu̩ebec"},
            { "id": 2, "name" :  "Remorques en Direct Montreal"},
            { "id": 3, "name" :  "Remorques en Direct Rive-Nord"},
            { "id": 4, "name" :  "Remorques en Direct Rive-Sud"},
            { "id": 5, "name" :  "Remorques en Direct Lévis"},
            { "id": 6, "name" :  "Remorques en Direct Trois-Rivieres"},
            { "id": 7, "name" :  "Remorques en Direct Drummondville"},
            { "id": 8, "name" :  "Remorques en Direct New Brunswick"},
            { "id": 9, "name" :  "Remorques en Direct Saguenay"}
        ]
    }

    
    $onInit(){
        this.currentDate = new Date();
        
       
         if(this.bot.id != null){
                var today = new Date();
                var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.bot.start, 0, 0);
                this.bot.time_start = myToday
                myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.bot.end, 0, 0);
                this.bot.time_end = myToday
         }
 
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
            //get end and start hour.
            //
            
            this.bot.start = this.moment(this.bot.time_start).format("H");
            this.bot.end = this.moment(this.bot.time_end).format("H");
            if(this.bot.id){
                //update
                this.API.one('bots').customPUT(this.bot,this.bot.id).then((response) => {
                    if(response.error){
                        this.$log.debug(response);
                    }else{
                        this.$state.reload()
                        swal('Bot updated!', '', 'success')
    
                        this.closeparent();
                        this.$log.debug(response);
    
    
                    }
                        
                })
            }else{
                this.API.all('bots').post(this.bot).then((response) => {
                    if(response.error){
                        this.$log.debug(response);
                    }else{
                        this.$state.reload()
                        swal('Bot added!', '', 'success')
    
                        this.closeparent();
                        this.$log.debug(response);
    
    
                    }
                        
                })
            }

        }else{
            alert("Revisar formulario");
        }


    }

    projectEditing(){
       return this.mode=="edit"
    }


    exitValidation(input){
        return angular.equals({}, input);
    }
}

export const BotFormComponent = {
    templateUrl: './views/app/components/bot-form/bot-form.component.html',
    controller: BotFormController,
    controllerAs: 'vm',
    bindings: {
        "closeparent" : "&",
        "bot":"=?",
        "mode":"=?"
    }
};
