class UserVerificationController {
  constructor ($stateParams) {
    'ngInject'
    this.alerts = []

    if ($stateParams.status === 'success') {
      this.alerts.push({ type: 'success', 'title': 'E-mail Verificado!', msg: 'Ya puedes ingresar a la plataforma.' })
    } else {
      this.alerts.push({ type: 'danger', 'title': 'Error:', msg: 'Verificación de E-mail Falló. Contacte con el Admin del sistema' })
    }
  }

  $onInit () {}
}

export const UserVerificationComponent = {
  templateUrl: './views/app/components/user-verification/user-verification.component.html',
  controller: UserVerificationController,
  controllerAs: 'vm',
  bindings: {}
}
