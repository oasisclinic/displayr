'use strict';
angular.module('surveys', ['ngResource']).factory('Surveys', ['$resource', function($resource) {
    var host = 'http://54.173.152.217';
    return $resource(host + '/api/surveys/', null, 
    {
        'getAvailable': {method: 'GET', isArray: true},
        'responses': {
                    method: 'GET',
                    url: host + '/api/surveys/responses/:surveyId/:patientId',
                    params: {surveyId: '@surveyId', patientId: '@patientId'}
        },
        'start': {
            url: host + '/api/surveys/start/:surveyId/:patientId',
            params: {surveyId: '@surveyId', patientId: '@patientId'},
            method: 'POST'
        }
    });

}]);
