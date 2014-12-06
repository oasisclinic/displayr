'use strict';

angular.module('api', ['ngResource'])
    .factory('patients', ['$resource', '$rootScope', function($resource, $rootScope) {
        return $resource($rootScope.domain + '/patients', null, {
            'get': {
                url: $rootScope.domain + '/patients/:patientId',
                method: 'GET',
                params: {
                    patientId: '@patientId'
                }
            },
            //Patients.createPatient({}, {patientObj}), empty object is param placeholder.
            'createPatient': {
                url: $rootScope.domain + '/patients/create',
                method: 'POST',
            },
            'all': {
                method: 'GET',
                isArray: true
            },
        });
    }])
    .factory('evaluations', ['$resource', '$rootScope', function($resource, $rootScope) {
        return $resource($rootScope.domain + '/evaluations/', null, {
            'byPatientId': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations/results/:patientId',
                params: {
                    patientId: '@patientId'
                },
                isArray: true
            },
            'bySurveyId': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations/results/:patientId/:surveyId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                }
            },
            'byId': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations/:evaluationId',
                params: {
                    surveyId: '@evaluationId'
                }
            },
            'remove': {
                method: 'DELETE',
                url: $rootScope.domain + '/evaluations/:evaluationId',
                params: {
                    surveyId: '@evaluationId'
                }
            },
            'make': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations/start/:patientId/:surveyId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                }
            },
            'recent': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations?limit=:limit',
                params: {
                    limit: '@limit',
                },
                isArray: true
            },
            'complete': {
                method: 'GET',
                url: $rootScope.domain + '/evaluations/complete/:requestId/:responseId',
                params: {
                    requestId: '@requestId',
                    responseId: '@responseId'
                }
            }
        });

    }])
    .factory('surveys', ['$resource', '$rootScope', function($resource, $rootScope) {
        return $resource($rootScope.domain + '/surveys/', null, {
            'get': {
                method: 'GET',
                isArray: true
            }
        });
    }]);