export class ContextService {
  constructor ($auth, $rootScope, API) {
    'ngInject'
    this.$auth = $auth
    this.API = API
    this.$rootScope = $rootScope
    this.baseUrl = "http://obsriomagdalena.lcrojano.com"
  }

  getContext () {
    let $auth = this.$auth

    if ($auth.isAuthenticated()) {
      let API = this.API
      let UserData = API.service('me', API.all('users'))
      UserData.avatar = "/img/avatar.png"

      return UserData.one().get()
    } else {
      return null
    }
  }

  me (cb) {
    this.$rootScope.$watch('me', function (nv) {
      cb(nv)
    })
  }
  
}
