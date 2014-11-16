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
        it('should call getPatient with patientid', function(){
            $httpBackend.expectGET('/patients/123e4567-e89b-12d3-a456-426655440000')
                .respond({
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                });
            var result = mockPatientResource.getPatient({action: '123e4567-e89b-12d3-a456-426655440000'});

            $httpBackend.flush();

            expect(result.patientId).toBe('123e4567-e89b-12d3-a456-426655440000');
            expect(result.medicalId).toBe('');
            expect(result.firstName).toBe('John');
            expect(result.lastName).toBe('Connor');
       });
    });

    describe('createPatient', function() {
        it('should PUT a patient object to the server', inject(function(Patients) {
            var patient = {
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                };
            $httpBackend.expectPOST('/patients/create', patient).respond(201, ''); 
            var result = Patients.createPatient(patient);
            $httpBackend.flush();
        }));
   }); 

   describe('all', function () {
        it('should return 2 patients in an array', inject(function(Patients) {
            var patients = [{
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                },
                {
                    'patientId': '123e4567-e89b-12d3-a456-426655440000',
                    'medicalId': '',
                    'firstName': 'John',
                    'lastName': 'Connor',
                }];

                $httpBackend.expectGET('/patients/all').respond(200, patients);
                var result = Patients.all();
                $httpBackend.flush();
                expect(result.length).toBe(patients.length);
                    
        }));
   });
});
