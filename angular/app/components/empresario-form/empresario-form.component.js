class EmpresarioFormController{
    constructor($auth, $state, $scope, API){
        'ngInject';

    this.$auth = $auth
    this.$state = $state
    this.$scope = $scope
    this.API = API

     
    this.formSubmitted = false
    this.registerForm
    this.errors = []
    
 
 
  }

  $onInit () {
    this.name = ''
    this.email = ''
    this.type=''
    this.password=''
    this.password_confirmation = ''
    
  }

  register (isValid) {
    if (isValid) {
      var user = {
        name: this.name,
        email: this.email,
        password: this.password,
        type: this.type,

      }
        this.API.all('users/add/custom').post(user).then((response) => {
            if(response.errors){
                swal(response.message, '', 'error')
                $log.debug(response);
                //this.closeparent();
            }else{
                this.$state.reload()
                swal('Usuario creado con exito!', 'Se ha enviado un correo al usuario donde deberá elejir una contraseña', 'success')

                this.closeparent();
                $log.debug(response);


            }

        }).catch(this.failedRegistration.bind(this))
    } else {
      this.formSubmitted = true
    }
  }

  failedRegistration (response) {
    if (response.status != 200) {
      for (var error in response.data.errors) {
        this.errors[error] = response.data.errors[error][0]
        this.registerForm[error].$invalid = true
        //this.closeparent();
      }
    }
  }
}

export const EmpresarioFormComponent = {
    templateUrl: './views/app/components/empresario-form/empresario-form.component.html',
    controller: EmpresarioFormController,
    controllerAs: 'vm',
    bindings: {
       "closeparent" : "&"
       
    }
};
