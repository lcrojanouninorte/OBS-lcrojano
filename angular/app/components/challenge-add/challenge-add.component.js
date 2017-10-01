class ChallengeAddController{
    constructor(API, $state, $stateParams){
        'ngInject';

    this.$state = $state
    this.formSubmitted = false
    this.API = API
    this.alerts = []

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }
  }

  save (isValid) {
    this.$state.go(this.$state.current, {}, { alerts: 'test' })
    if (isValid) {
      let Challenge = this.API.all('challenge')
      let $state = this.$state

      Challenge.post({
        'desc': this.desc,
        'fecha_inicio': this.fecha_inicio,
        'fecha_final': this.fecha_final
      }).then(function (response) {
        let alert = { type: 'success', 'title': 'Success!', msg: 'Reto creado.' }
        $state.go('app.kickstarter')
      }, function (response) {
        let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
        $state.go($state.current, { alerts: alert})
      })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const ChallengeAddComponent = {
    templateUrl: './views/app/components/challenge-add/challenge-add.component.html',
    controller: ChallengeAddController,
    controllerAs: 'vm',
    bindings: {}
};
