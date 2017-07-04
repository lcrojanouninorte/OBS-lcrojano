class PerfilinnovadorChartController{
    constructor(SurveyService){
        'ngInject';

        //
        this.SurveyService = SurveyService;
          //this.labels = ["Estrategia", "Procesos", "Organización", "Conexiones", "Aprendizaje"];
        this.labels = ["Productor", "Ideador", "Implementador", "Clarificador"];
          //this.series = ['Series A', 'Series B']; para comparar
        this.data = [
            [65, 59, 80, 81],
           // [28, 48, 40, 19]
        ];
          this.onClick = function (points, evt) {
            console.log(points, evt);
          };
          //this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
         /* this.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
                },
                {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
                }
              ]
            }
          };*/

          
    }

    $onInit(){
        let SurveyPromise = this.SurveyService.getAnswers(2);
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

export const PerfilinnovadorChartComponent = {
    templateUrl: './views/app/components/perfilinnovador-chart/perfilinnovador-chart.component.html',
    controller: PerfilinnovadorChartController,
    controllerAs: 'vm',
    bindings: {}
}
