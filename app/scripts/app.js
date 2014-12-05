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
            url: '/patients/{patientId}',
            template: '<div ui-view></div>',
            controller: function($scope, $stateParams, $state, patients) {
                patients.get({
                    patientId: $stateParams.patientId
                }).$promise.then(function(patient) {
                    $scope.patient = patient;
                })
            }
        });
        $stateProvider.state('patients.profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        });
        $stateProvider.state('patients.chart', {
            url: '/chart/{surveyId}',
            templateUrl: 'views/chart.html',
            controller: 'ChartCtrl'
        });
        $stateProvider.state('patients.response', {
            url: '/response/{evaluationId}',
            templateUrl: 'views/response.html',
            controller: 'ResponseCtrl'
        });
        $stateProvider.state('search', {
            url: '/search',
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        });

        // survey administration
        $stateProvider.state('survey', {
            url: '/surveys',
            template: '<div ui-view></div>'
        });
        $stateProvider.state('survey.give', {
            url: '/give',
            templateUrl: 'views/pick-survey.html',
            controller: 'GiveSurveyCtrl'
        });
        $stateProvider.state('survey.to', {
            url: '/give/{surveyId}/to',
            templateUrl: 'views/to-survey.html',
            controller: 'ToSurveyCtrl'
        });
        $stateProvider.state('survey.ready', {
            url: '/give/{surveyId}/to{patientId}',
            templateUrl: 'views/ready-survey.html',
            controller: 'SurveyReadyCtrl'
        });
        $stateProvider.state('survey.take', {
            url: '/take',
            templateUrl: 'views/take-survey.html',
            controller: 'TakeSurveyCtrl'
        });

    }])
    .run(function($rootScope, $modal, authService) {
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