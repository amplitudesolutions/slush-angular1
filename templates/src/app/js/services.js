'use strict';

angular.module('<%= appName %>.services', [
	
])

.factory('authInterceptor', function($rootScope, $q, $window, $location) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    },
    responseError: function (rejection) {
        if (rejection.status === 401 || rejection.status === 403) {
          delete $window.sessionStorage.token;

          $location.path('/login');
          // $state.go('login');
          // handle the case where the user is not authenticated
        }
        return $q.reject(rejection);
      }
    };
})

.factory('auth', function auth($http, API_URL, $window) {
  return {
    authenticate: function(email, password) {
      return $http.post(API_URL + '/authenticate', {email: email, password: password}).then(function(response){
        if (response.data.token) {
          $window.sessionStorage.token = response.data.token;
          $window.sessionStorage.user_id = response.data.user._id;
          $window.sessionStorage.name = response.data.user.name;
          $window.sessionStorage.email = response.data.user.email;
        }

        return response.data;
      })
    },
    logout: function() {
      return delete $window.sessionStorage.token;
    },
    getDetails: function() {
      // Return info from $window.sessionStorage
      return {_id: $window.sessionStorage.user_id ,name: $window.sessionStorage.name, email: $window.sessionStorage.email}
    },
    changePassword: function(currentpassword, newpassword, repeatpassword) {
      return $http.post(API_URL + '/users/changepassword', {currentpassword: currentpassword, newpassword: newpassword, repeatpassword: repeatpassword}).then(function(response) {
        return response.data;
      });
    }
  };
})

;