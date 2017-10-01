class ActividadesListController{
    constructor(){
        'ngInject';

        //
       

        this.titulo = ""
        this.fecha_inicio =""
        this.fecha_fin =""
        this.dates = {"startDate": null, "endDate": null}

        

    }

    $onInit(){
        this.actividades = [
            {"id":"1","titulo": "Actividad 1", "fecha_inicio":"10 Agosto 2017", "fecha_fin":"10 Octubre 2017","done":false},
            {"id":"2","titulo": "Actividad 2", "fecha_inicio":"10 Agosto 2017", "fecha_fin":"10 Octubre 2017","done":true}
        ]
    }

    add(index){

        
        let new_actividad = {
            "titulo":this.titulo,
            "fecha_inicio": this.dates.startDate,
            "fecha_fin": this.dates.endDate,
            "done":false,
            "id" : this.actividades.lenght
        }
        this.actividades.push(new_actividad)
    }

    delete(index){
        this.actividades.splice(index,1)
    }


}

export const ActividadesListComponent = {
    templateUrl: './views/app/components/actividades-list/actividades-list.component.html',
    controller: ActividadesListController,
    controllerAs: 'vm',
    bindings: {
        //actividades:'='
        show:"="
    }
};
