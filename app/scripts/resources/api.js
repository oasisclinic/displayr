'use strict';

var host = 'http://localhost:8080';

angular.module('api', ['ngResource'])
    .factory('patients', ['$resource', function($resource) {
        return $resource(host + '/api/patients', null, {
            'get': {
                url: host + '/api/patients/:patientId',
                method: 'GET',
                params: {
                    patientId: '@patientId'
                }
            },
            //Patients.createPatient({}, {patientObj}), empty object is param placeholder.
            'createPatient': {
                url: host + '/api/patients/create',
                method: 'POST',
            },
            'all': {
                method: 'GET',
                isArray: true
            },
        });
    }])
    .factory('evaluations', ['$resource', function($resource) {
        return $resource(host + '/api/evaluations/', null, {
            'byPatientId': {
                method: 'GET',
                url: host + '/api/evaluations/results/:patientId',
                params: {
                    patientId: '@patientId'
                },
                isArray: true
            },
            'bySurveyId': {
                method: 'GET',
                url: host + '/api/evaluations/results/:patientId/:surveyId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                }
            },
            'byId': {
                method: 'GET',
                url: host + '/api/evaluations/:evaluationId',
                params: {
                    surveyId: '@evaluationId'
                }
            },
            'remove': {
                method: 'DELETE',
                url: host + '/api/evaluations/:evaluationId',
                params: {
                    surveyId: '@evaluationId'
                }
            },
            'make': {
                method: 'GET',
                url: host + '/api/evaluations/start/:patientId/:surveyId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                }
            },
            'recent': {
                method: 'GET',
                url: host + '/api/evaluations?limit=:limit',
                params: {
                    limit: '@limit',
                },
                isArray: true
            }
        });

    }])
    .factory('surveys', ['$resource', function($resource) {
        return $resource(host + '/api/surveys/', null, {
            'get': {
                method: 'GET',
                isArray: true
            }
        });
    }]);