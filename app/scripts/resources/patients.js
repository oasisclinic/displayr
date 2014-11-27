angular.module('patient', ['ngResource']).factory('Patients', ['$resource', function ($resource) {
    return $resource('http://54.173.152.217/api/patients/:action', null,
            {
                'getPatient': {method: 'GET'},
                'createPatient': {method: 'POST', params: {action: 'create'}, patient: {}},
                'all': {method: 'GET', isArray: true},
            });
}]);
