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
        'api',
        //'resourceUtils',
        'ui.bootstrap',
        'ui.bootstrap.tpls',
        'ui.bootstrap.modal',
        'ui.router',
        'ngTable',
        'auth',
        'http-auth-interceptor',
        'highcharts-ng'
    ])
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('patients', {
            url: '/',
            templateUrl: 'views/dashboard.html',
            data: {}
        });
        $stateProvider.state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        });
        $stateProvider.state('profile', {
            url: '/patient/{patientId}',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        });
        $stateProvider.state('chart', {
            url: '/patient/chart/{patientId}/{surveyId}',
            templateUrl: 'views/chart.html',
            controller: 'ChartCtrl'
        });
    }])
    // .config(function($resourceProvider, $httpProvider, $logProvider, $routeProvider) {
    //     //$httpProvider.interceptors.push('APIInterceptor');

    //     $logProvider.debugEnabled(true);

    //     $resourceProvider.defaults.stripTrailingSlashes = false;
    //     $routeProvider
    //         .when('/', {
    //             templateUrl: 'views/login.html',
    //         })
    //         .when('/dashboard', {
    //             templateUrl: 'views/dashboard.html',
    //             controller: 'DashboardCtrl'
    //         })
    //         .when('/login', {
    //             templateUrl: 'views/login.html',
    //             controller: 'LoginCtrl'
    //         })
    //         .when('/addpatient', {
    //             templateUrl: 'views/addpatient.html',
    //             controller: 'AddpatientCtrl'
    //         })
    //         .when('/survey', {
    //             templateUrl: 'views/survey.html',
    //             controller: 'SurveyCtrl'
    //         })
    //         .when('/patientprofile/:id', {
    //             templateUrl: 'views/patientprofile.html',
    //             controller: 'PatientprofileCtrl'
    //         })
    //         .when('/patientprofile/:patientid/graph/:surveyid', {
    //             templateUrl: 'views/patientgraph.html',
    //             controller: 'PatientgraphCtrl'
    //         })
    //         .when('/searchpatients', {
    //             templateUrl: 'views/searchpatients.html',
    //             controller: 'SearchpatientsCtrl'
    //         })
    //         .otherwise({
    //             redirectTo: '/'
    //         })
    // })
.run(function($rootScope, $modal, authService) {
        var errorA;
        //var loginModal;
        $rootScope.$on('apiError', function(event, data) {
            errorA = $modal.open(data);
        });
        $rootScope.$on('event:auth-loginRequired', function() {
            if (!$rootScope.loginModal) {
                $rootScope.loginModal = $modal.open({
                    templateUrl: 'views/modals/login.html',
                    backdrop: 'static',
                    keyboard: false
                });
            }

        });
        $rootScope.$on('event:auth-loginConfirmed', function() {
            $rootScope.loginModal.close();
        });
    });