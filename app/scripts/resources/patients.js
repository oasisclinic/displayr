angular.module('patient', ['ngResource']).factory('Patients', ['$resource', function ($resource) {
    return $resource('/patients/:patientid', null,
            {
                'getPatient': {method: 'GET'}
            });
}]);
