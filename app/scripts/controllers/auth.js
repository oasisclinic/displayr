'use strict';

/**
 * @ngdoc function
 * @name oasis.controller:LoginController
 * @description
 * # LoginCtrl
 * Controller of the frontendMark2App
 */
angular.module('auth', [])
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