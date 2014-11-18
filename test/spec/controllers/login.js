'use strict';

describe('Controller: LoginCtrl', function () {
    var $location;

  // load the controller's module
  beforeEach(module('frontendMark2App', function($provide){
        $location = {};
        $location.path = jasmine.createSpy();
        $provide.value('$location', $location);
  }));

  var LoginCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  it('should have a username and password field', function () {
    expect(scope.username).toBe("");
    expect(scope.password).toBe("");
  });

  it('should change the route to /dashboard', function () {
    scope.login();
    expect($location.path).toHaveBeenCalledWith('/dashboard');
  });
});
