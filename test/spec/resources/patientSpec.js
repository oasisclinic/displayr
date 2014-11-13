`use strict`;
describe('Patients', function () {
    var mockPatientResource, $httpBackend;

    beforeEach(module('patient'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackEnd = $injector.get('$httpBackEnd');
            mockPatientResource = $injector.get('Patients');

        });
    });

    describe('getPatient', function() {
        it('should call getPatient with patientid', inject(function(Patients) {
            $httpBackend.expectGET('/patients/123e4567-e89b-12d3-a456-426655440000')
                .respond([{
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                }]);
            var result = mockPatientResource.getPatient('123e4567-e89b-12d3-a456-426655440000');

            expect(result[0].patientId).toBe('123e4567-e89b-12d3-a456-426655440000');
            expect(result[0].medicalId).toBe('');
            expect(result[0].firstName).toBe('John');
            expect(result[0].lastName).toBe('Connor');
        }));
    });
});
