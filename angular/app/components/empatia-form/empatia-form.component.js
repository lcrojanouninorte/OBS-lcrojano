class EmpatiaFormController{
    constructor(SurveyService, $log, $element){
        'ngInject';
        //
        this.$log = $log
        this.questions = []
        this.SurveyService = SurveyService
        this.answers = {}
        this.survey = {}
        this.$element = $element;

        
        this.selectedUsers = ""
        this.user=""
        this.users = ['Juan' ,'Pedro' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
        this.searchTerm =""
        
          // The md-select directive eats keydown events for some quick select
          // logic. Since we have a search input here, we don't need that logic.
          
    }
     clearSearchTerm() {
            this.searchTerm = '';
        };

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

           this.$element.find("#searchTerm").on('keydown', function(ev) {
              ev.stopPropagation();
          });
    }
}

export const EmpatiaFormComponent = {
    templateUrl: './views/app/components/empatia-form/empatia-form.component.html',
    controller: EmpatiaFormController,
    controllerAs: 'vm',
    bindings: {}
}
