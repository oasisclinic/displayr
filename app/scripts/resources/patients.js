angular.module('patient', ['ngResource']).factory('Patients', ['$resource', function ($resource) {
   var host = 'http://localhost:8080';
   return $resource(host + '/api/patients', null,
            {
                'getPatient': {
                    url: host + '/api/patients/:patientId',
                    method: 'GET',
                    params: {patientId: '@patientId'}
                },
                //Patients.createPatient({}, {patientObj}), empty object is param placeholder.
                'createPatient': {
                        url: host + '/api/patients/create',
                        method: 'POST',
                },
                'all': {method: 'GET', isArray: true},
            });
}]);
