'use strict';

/**
 * @ngdoc function
 * @name oasis.controller:LoginController
 * @description
 * # LoginCtrl
 * Controller of the frontendMark2App
 */
angular.module('auth', [])
    // .constant('AUTH_EVENTS', {
    //   loginSuccess: 'auth-login-success',
    //   loginFailed: 'auth-login-failed',
    //   logoutSuccess: 'auth-logout-success',
    //   sessionTimeout: 'auth-session-timeout',
    //   notAuthenticated: 'auth-not-authenticated',
    //   notAuthorized: 'auth-not-authorized'
    // })
    .factory('securityService', function($http, Session) {
        var securityService = {};

        securityService.login = function(credentials) {
            return $http
                .post('http://localhost:8080/api/authenticate', credentials)
                .then(function(res) {
                    Session.create(res.data.token);
                    return;
                });
        };

        securityService.isAuthenticated = function() {
            return !!Session.userId;
        };

        return securityService;
    })
    .service('Session', function() {
        this.create = function(sessionId) {
            this.id = sessionId;
        };
        this.destroy = function() {
            this.id = null;
        };
        return this;
    })
    // .config(['$stateProvider', function($stateProvider) {
    //     $stateProvider.state('dashboard', {
    //         url: '/dashboard',
    //         templateUrl: 'dashboard/index.html',
    //         data: {}
    //     });
    // }])
    // .run(function($rootScope, AUTH_EVENTS, AuthService) {
    //   $rootScope.$on('$stateChangeStart', function(event, next) {
    //     // var authorizedRoles = next.data.authorizedRoles;
    //     // if (!AuthService.isAuthorized(authorizedRoles)) {
    //     //   event.preventDefault();
    //     //   if (AuthService.isAuthenticated()) {
    //     //     // user is not allowed
    //     //     $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
    //     //   } else {
    //     //     // user is not logged in
    //     //     $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
    //     //   }
    //     // }

//   });
// })
    // .config(['$httpProvider', function($httpProvider) {
    //     $httpProvider.interceptors.push(['$rootScope', '$q', 'Session', function($rootScope, $q, Session) {
    //         return {
    //             request: function(config) {
    //                 alert(Session.id);
    //                 if (Session.id) {
    //                     config.headers['x-auth-token'] = Session.id;
    //                 }
    //                 return config;
    //             }
    //         };
    //     }]);
    // }])
    .config(function($httpProvider) {
            $httpProvider.interceptors.push([
                '$injector',
                function($injector) {
                    return $injector.get('AuthInterceptor');
                }
            ]);
        })
        .factory('AuthInterceptor', function($rootScope, $q, Session) {
            return {
                request: function(config) {
                    if (Session.id) { 
                        config.headers['x-auth-token'] = Session.id;
                    }
                    return config;
                }
            };
        })
    // .directive('loginDialog', function(AUTH_EVENTS, $modal) {
    //   return {
    //     restrict: 'A',
    //     link: function(scope) {
    //       var showDialog = function() {
    //         scope.visible = true;

//         var modalInstance = $modal.open({
//             templateUrl: '/views/modals/login.html',
//             controller: 'ModalInstanceCtrl',
//             size: 1,
//             resolve: {
//               items: function () {
//                 return $scope.items;
//               }
//             }
//           });

//       };

//       scope.visible = false;
//       scope.$on(AUTH_EVENTS.notAuthenticated, showDialog);
//       scope.$on(AUTH_EVENTS.sessionTimeout, showDialog)
//     }
//   };
// })
// .controller('ApplicationController', function($scope,
//   AuthService) {
//   $scope.authToken = null;
//   $scope.isAuthorized = AuthService.isAuthorized;
//   $scope.isAuthenticated = AuthService.isAuthenticated;
// })
.controller('LoginController', function($scope, $rootScope, authService, securityService, Session) {
    $scope.credentials = {
        username: '',
        password: ''
    };
    $scope.login = function(credentials) {
        securityService.login(credentials).then(function() {
            //$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            var addHeaders = function(config) {
              config.headers['x-auth-token'] = Session.id;
              return config;
            }
            authService.loginConfirmed(null, addHeaders);
            // $scope.authToken = authToken;
        }, function() {
            //$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            authService.loginCancelled();
        });
    };
});