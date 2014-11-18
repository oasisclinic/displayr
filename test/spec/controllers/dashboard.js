'use strict';

describe('Controller: DashboardCtrl', function () {
                var DashboardCtrl,
                backendPatients,
                $httpBackend,
                scope,
                $location;

                // load the controller's module
                beforeEach(module('frontendMark2App', function($provide){
                                $location = {};
                                $location.path = jasmine.createSpy();
                                $provide.value('$location', $location);
                                }));



                // Initialize the controller and a mock scope
                beforeEach(inject(function ($injector, $controller, $rootScope) {
                                $httpBackend = $injector.get('$httpBackend');
                                scope = $rootScope.$new();
                                DashboardCtrl = $controller('DashboardCtrl', {
                                        $scope: scope
                                        })
                                backendPatients = [
                                {'patientId':'123e4567-e89b-12d3-a456-426655440000',
                                'medicalId': '',
                                'firstName': 'Joseph',
                                'lastName': 'Smith',
                                },
                                {'patientId': '123e4567-e89b-12d3-a456-426655441111',
                                'medicalId': '',
                                'firstName': 'Aldus',
                                'lastName':  'Huxley',
                                },
                                {'patientId': '123e4567-e89b-12d3-a456-426655442222',
                                'medicalId': '',
                                'firstName': 'Mayor',
                                'lastName': 'Huxtable',
                                },
                                {'patientId': '123e4567-e89b-12d3-a456-426655443333',
                                        'medicalId': '',
                                        'firstName': 'Baker',
                                        'lastName': 'Jenny',
                                } ];
                }));

                it('should attach a list of awesomeThings to the scope', function () {
                                expect(scope.awesomeThings.length).toBe(3);
                                });

                it('should fetch a list of of all the patients', function () {
                                $httpBackend.expectGET('/patients/all').respond(200, backendPatients);
                                $httpBackend.flush();
                                expect(scope.patients.length).toBe(4);
                                });

                it('should have methods to route the user to administer a survey, add a patient, and view a patient profile', function () {

                                scope.routeSurvey();
                                expect($location.path).toHaveBeenCalledWith('/givesurvey');
                                scope.routeAddPatient();
                                expect($location.path).toHaveBeenCalledWith('/addpatient');
                                scope.routePatientProfile('1234');
                                expect($location.path).toHaveBeenCalledWith('/profile/1234');
                                });
});
