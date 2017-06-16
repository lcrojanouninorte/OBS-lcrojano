class ProjectListController{
    constructor(){
        'ngInject';

        //
    }

    $onInit(){

        this.pieLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales']
        this.pieData = [300, 500, 100]
        this.projects = [
        {
            title:"Diseño y desarrollo de la plataforma web CUBUN,herramienta tecnológica que permitirá a los docentes ajustar los contenidos presentes en la plataforma,a los incluídos en los planes de estudio;vinculará a estudiantes y padres de familia en el proceso de enseñanza-aprendizaje y mejorará los procesos pedagógicos en la enseñanza de una segunda lengua en las instituciones de educación básica primaria.", 
            progress:[10, 20] 
        },
        {
            title:"projecto 2", 
            progress:[30, 10] 
        },
        {
            title:"projecto 2", 
            progress:[30, 10] 
        },
        {
            title:"projecto 2", 
            progress:[30, 10] 
        },
        {
            title:"projecto 2", 
            progress:[30, 10] 
        },
        {
            title:"projecto 2", 
            progress:[30, 10] 
        }

        ];
    }
}

export const ProjectListComponent = {
    templateUrl: './views/app/components/project-list/project-list.component.html',
    controller: ProjectListController,
    controllerAs: 'vm',
    bindings: {}
}
