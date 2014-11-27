'use strict';
//This will have to wait to be tested

describe('Controller: AddpatientCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendMark2App').run(function($rootScope, $modal) {
    
  }));

  var AddpatientCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($modal, $controller, $rootScope) {
    scope = $rootScope.$new();
    AddpatientCtrl = $controller('AddpatientCtrl', {
         $scope: scope,
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
