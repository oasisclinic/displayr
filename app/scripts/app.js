'use strict';

/**
 * @ngdoc overview
 * @name frontendMark2App
 * @description
 * # frontendMark2App
 *
 * Main module of the application.
 */
angular
  .module('frontendMark2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'patient',
    'resourceUtils',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'ui.bootstrap.modal',
  ])
  .config(function ($resourceProvider, $httpProvider, $logProvider, $routeProvider) {
    $httpProvider.interceptors.push('APIInterceptor');
    
    $logProvider.debugEnabled(true);

    $resourceProvider.defaults.stripTrailingSlashes = false;
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/addpatient', {
        templateUrl: 'views/addpatient.html',
        controller: 'AddpatientCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  }).run(function($rootScope, $modal) {

        var error;
        $rootScope.$on('apiError', function(event, data) {
            error = $modal.open(data);
        });
  });
