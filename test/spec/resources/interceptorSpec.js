describe('Interceptors', function() {
    var $httpBackend, $http,  mockApp, rootScope;

    beforeEach(module('resourceUtils', function ($httpProvider) { 
            $httpProvider.interceptors.push('APIInterceptor');
    }));
    beforeEach(function() {
        inject( function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');
        rootScope = $injector.get('$rootScope');
        spyOn(rootScope, '$broadcast');
    })});

    describe('Test set up', function () {
        it('should use $http to test', function () {
            expect($http).toBeDefined();
        });
    });


    //Replacing services with Jasmine Spies: Testing whether the interceptor uses a service.
    //http://angular-tips.com/blog/2014/06/introduction-to-unit-test-services/
    describe('Error Handling', function () {
        it('should launch a modal on several HTTP Errors', function () {
            var errors = [401, 403,  404, 500];
            var response;

            errors.forEach(function(errorCode, index) {
                    $httpBackend.whenGET('/'+errorCode + '.html').respond(errorCode);
                    response = $http.get('/'+errorCode+'.html');
                    $httpBackend.flush();
                    expect(rootScope.$broadcast).toHaveBeenCalled();
            });
        });
    });

})
