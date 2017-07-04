class MindexChartController{
    constructor(SurveyService){
        'ngInject';

        //
        this.SurveyService =SurveyService
        this.labels = ["Estrategia", "Procesos", "Organización", "Conexiones", "Aprendizaje"];

  this.data = [
    [65, 59, 90, 81,20],
    [7, 7, 7, 7,7],
    [5, 5, 5, 5,5]
  ];
    }

    $onInit(){
        let SurveyPromise = this.SurveyService.getAnswers(1);
        SurveyPromise.get()
            .then((response) => {
                if (!response.errors) {
                    this.data[0] = response.data
                } else {
                    //TODO no se cargo la encuesta
                    this.$log.debug(response);
                }
            })
    }
}

export const MindexChartComponent = {
    templateUrl: './views/app/components/mindex-chart/mindex-chart.component.html',
    controller: MindexChartController,
    controllerAs: 'vm',
    bindings: {}
}
