angular.module('patient', ['ngResource']).factory('Patients', ['$resource', function ($resource) {
    return $resource('/patients/:action', null,
            {
                'getPatient': {method: 'GET'},
                'createPatient': {method: 'POST', params: {action: 'create'}, patient: {}},
                'all': {method: 'GET', isArray: true,  params: {action: 'all'}},
            });
}]);
