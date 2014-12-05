angular.module('api', ['ngResource'])
    .factory('patients', ['$resource', function($resource) {
        var host = 'http://localhost:8080';

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
    .factory('surveys', ['$resource', function($resource) {
        var host = 'http://localhost:8080';
        return $resource(host + '/api/surveys/', null, {
            'getAvailable': {
                method: 'GET',
                isArray: true
            },
            'responses': {
                method: 'GET',
                url: host + '/api/surveys/responses/:surveyId/:patientId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                }
            },
            'start': {
                url: host + '/api/surveys/start/:surveyId/:patientId',
                params: {
                    surveyId: '@surveyId',
                    patientId: '@patientId'
                },
                method: 'POST'
            }
        });

    }]);