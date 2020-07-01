export class ContextService {
  constructor ($auth, $rootScope, API) {
    'ngInject'
    this.$auth = $auth
    this.API = API
    this.$rootScope = $rootScope
<<<<<<< HEAD
    this.baseUrl = "http://obsriomagdalena.lcrojano.com"
=======
    this.baseUrl = "http://localhost:8000/"
>>>>>>> f28da96f16008ada72ae86c39623643931c4b283
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
