describe('Interceptors', function() {
    var $httpBackend, $http,  mockApp, $modal;

    beforeEach(module('resourceUtils', function ($httpProvider, $provide) { 
            $modal = {};//replace $modal with a spy
            $modal.open = jasmine.createSpy();
            $httpProvider.interceptors.push('APIInterceptor');
            $provide.value('$modal', $modal);
    }));
    beforeEach(function() {
        inject( function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $http = $injector.get('$http');
    })});

    describe('Test set up', function () {
        it('should use $http to test', function () {
            expect($http).toBeDefined();
        });

    });


    //Replacing services with Jasmine Spies: Testing whether the interceptor uses a service.
    //http://angular-tips.com/blog/2014/06/introduction-to-unit-test-services/
    describe('404 error', function () {
        it('should launch a modal with Server Error in the title', function () {
            $httpBackend.whenGET('/notfound').respond(404, 'Not Found');
            var response = $http.get('/notfound');
            $httpBackend.flush();
            expect($modal.open).toHaveBeenCalled();
        });
    });

})
