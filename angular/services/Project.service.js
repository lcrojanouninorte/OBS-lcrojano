export class ProjectService{
    constructor(API){
        'ngInject';

        //
        this.project = {}
        this.API = API
    }

    all(){
        let Projects = this.API.all('projects');
        Projects.getList()
          .then((response) => {
          	if(!response.error){
            this.projects = response.plain()
        }else{}
          })
        }
    


    get(project_id){
    	var Project = this.API.one('project', project_id).get()
    	Project.then((response) => {
            if(!response.error){   
                this.project = response.data
                return {}
            }else{
            	this.project = {}
            	return response
            }
        })
    }

    add_product (product) {
    let $auth = this.$auth

    if ($auth.isAuthenticated()) {
    	return this.API.all('products').post(product).then((response) => {
                if(response.error){
                    $log.debug(response);
                }else{
                    this.$state.reload()
                    swal('Producto agregado con exito!', '', 'success')

                    this.closeparent();
                    $log.debug(response);


                }
                    
            })

       
    } else {
      return null
    }
  }
}

