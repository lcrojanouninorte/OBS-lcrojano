class ActividadesFormController{
    constructor(){
        'ngInject';

        //
        this.actividad = {}
 this.options = {
      applyClass: 'btn-green',
      locale: {
        applyLabel: "Aplicar",
        fromLabel: "Desde",
        format: "D MMM YYYY", //will give you 2017-01-06
    //format: "D-MMM-YY", //will give you 6-Jan-17
    //format: "D-MMMM-YY", //will give you 6-January-17
        toLabel: "al",
        cancelLabel: 'Cancelar',
        customRangeLabel: 'Custom range'
      } 
    }


    }

    $onInit(){
    }






  
}

export const ActividadesFormComponent = {
    templateUrl: './views/app/components/actividades-form/actividades-form.component.html',
    controller: ActividadesFormController,
    controllerAs: 'vm',
    bindings: {
        add: "&",
        titulo:"=",
        dates:"="
    }
};
