'use strict';

describe('Controller: ModalerrorCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendMark2App'));

  var ModalerrorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalerrorCtrl = $controller('ModalerrorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
