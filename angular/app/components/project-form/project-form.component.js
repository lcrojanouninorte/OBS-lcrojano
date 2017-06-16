class ProjectFormController{
    constructor(API){
        'ngInject';
        this.API = API;

       
    }

    $onInit(){
         this.user = {
          name: 'John Doe',
          email: '',
          phone: '',
          address: 'Mountain View, CA',
          donation: 19.99
        };
    }
}

export const ProjectFormComponent = {
    templateUrl: './views/app/components/project-form/project-form.component.html',
    controller: ProjectFormController,
    controllerAs: 'vm',
    bindings: {}
}
