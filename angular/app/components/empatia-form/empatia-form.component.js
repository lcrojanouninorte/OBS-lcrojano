class EmpatiaFormController{
    constructor(SurveyService, $log){
        'ngInject';
        //
        this.$log = $log
        this.questions = []
        this.SurveyService = SurveyService
        this.answers = {}
        this.survey = {}
    }

    $onInit(){
        let SurveyPromise = this.SurveyService.get(3);
        this.$log.debug(SurveyPromise);
        SurveyPromise.get()
          .then((response) => {
            if(!response.errors){
                this.survey = response.data
            }else{
                //TODO no se cargo la encuesta
                 this.$log.debug(response);
            }
          })
    }
}

export const EmpatiaFormComponent = {
    templateUrl: './views/app/components/empatia-form/empatia-form.component.html',
    controller: EmpatiaFormController,
    controllerAs: 'vm',
    bindings: {}
}
