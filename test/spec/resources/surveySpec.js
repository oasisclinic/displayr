'use strict';
describe('Surveys', function() {
    var $httpBackend, mockSurveys;
    var host = 'http://54.173.152.217';

    beforeEach(module('frontendMark2App'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        mockSurveys = $injector.get('Surveys');
        })
    );

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('It should get a list of all possible surveys for administration', function() {
        $httpBackend.expectGET(host + '/api/surveys/').respond([{
            'name': 'standard',
            'id': '1234'
        }]);

        var result = mockSurveys.getAvailable();

        $httpBackend.flush();

        expect(result[0].name).toBe('standard');
        expect(result[0].id).toBe('1234');
    });

    it('It should post a patientId to be surveyed, and a surveyId to survey', function () {
        $httpBackend.expectPOST(host + '/api/surveys/start/1234/5678').respond(302, '');

        var result = mockSurveys.start({surveyId: '1234', patientId: '5678'});

        $httpBackend.flush();
        $httpBackend.flush();

    });
});

