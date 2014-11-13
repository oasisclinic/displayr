describe('Patients', function () {
    var mockPatientResource, $httpBackend;

    beforeEach(module('patient'));

    beforeEach(function () {
        inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            mockPatientResource = $injector.get('Patients');

        });
    });

    describe('getPatient', function() {
        it('should call getPatient with patientid', inject(function(Patients) {
            $httpBackend.expectGET('/patients/123e4567-e89b-12d3-a456-426655440000')
                .respond({
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                });
            var result = mockPatientResource.getPatient({patientid: '123e4567-e89b-12d3-a456-426655440000'});

            $httpBackend.flush();

            expect(result.patientId).toBe('123e4567-e89b-12d3-a456-426655440000');
            expect(result.medicalId).toBe('');
            expect(result.firstName).toBe('John');
            expect(result.lastName).toBe('Connor');
        }));
    });

    describe('createPatient', function() {
        it
});
