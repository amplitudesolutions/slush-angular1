'use strict';

angular.module('<%= appName %>')

    .config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    })

    .run(function($rootScope, $state, $window) {
        // Used for loading the default view from a parent state.
        // ie) go to /settings and it goes to /settings/general
        $rootScope.$on('$stateChangeSuccess', function(event, toState){
            var aac;
            if(aac = toState && toState.params && toState.params.autoActivateChild){
                $state.go(aac);
            }
        });

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var requireLogin = toState.data.requireLogin;
            
            if (requireLogin && typeof $window.sessionStorage.token === 'undefined') {
                event.preventDefault();
                $state.go('login', {return: toState.name});
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        // $ocLazyLoadProvider.config({
        //     // Set to true if you want to see what and when is dynamically loaded
        //     debug: false
        // });

        $stateProvider

            .state('login', {
                url: '/login?return',
                templateUrl: 'login/login.html',
                controller: 'loginCtrl as lg',
                data: {
                    pageTitle: 'Login',
                    requireLogin: false,
                    specialClass: 'gray-bg'
                }
            })

            .state('app', {
                abstract: true,
                url: '',
                templateUrl: 'views/common/main.html',
                controller: 'mainCtrl as mc',
                params: {
                    // Load nested view general by default.
                    autoActivateChild: 'app.dashboard'
                },
                data: {
                    requireLogin: true
                }
            })

            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'dashboard/dashboard.html',
                data: { pageTitle: 'Dashboard' },
                controller: 'dashboardCtrl as db'
            })
        ;
    })

    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    })

;