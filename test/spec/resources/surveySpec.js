describe('Surveys', function() {
    var $httpBackend;

    beforeEach(module('surveys'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        })
    );
});

