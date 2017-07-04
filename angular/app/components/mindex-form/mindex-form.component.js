class MindexFormController {
    constructor(SurveyService, $log) {
        'ngInject';

        //
        this.$log = $log
        this.questions = []
        this.SurveyService = SurveyService
        this.answers = {}
        this.survey = {}
    }

    $onInit() {
        let SurveyPromise = this.SurveyService.get(1);
        SurveyPromise.get()
            .then((response) => {
                if (!response.errors) {
                    this.questions = response.data.questions
                } else {
                    //TODO no se cargo la encuesta
                    this.$log.debug(response);
                }
            })
    }
       

    sizeOf(obj){
          return Object.keys(obj).length;
    }

    save() {
        if (this.sizeOf(this.answers) <= 40) {//TODO
            let SurveyPromise = this.SurveyService.put()
            .post(this.questions)
                .then((response) => {
                    if (!response.errors) {
                        this.$log.debug(response)
                        swal("Guardado Correctamente")
                    } else {
                        //TODO no se cargo la encuesta
                        this.$log.debug(response)
                    }
                }).catch(function(response) {
                    /* Act on the event */
                    this.$log.debug(response)
                });
        } else {
            swal("Aun no has contextado todo");
        }

    }

 
}

export const MindexFormComponent = {
    templateUrl: './views/app/components/mindex-form/mindex-form.component.html',
    controller: MindexFormController,
    controllerAs: 'vm',
    bindings: {}
}
