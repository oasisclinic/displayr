angular.module('patient', ['ngResource']).factory('Patients', ['$resource', function ($resource) {
   var host = 'http://54.173.152.217';
   return $resource(host + '/api/patients/:patientId', null,
            {
                'getPatient': {
                    method: 'GET',
                    params: {patientId: '@patientId'}
                },
                'createPatient': {
                        url: host + '/api/patients/create',
                        method: 'POST',
                        params: {action: 'create'},
                        patient: {}
                },
                'all': {method: 'GET', isArray: true},
            });
}]);
