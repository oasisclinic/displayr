'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendMark2App'));

  var DashboardCtrl,
    backendPatients,
    $httpBackend,
    scope;

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
});
