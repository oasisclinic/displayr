'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:SurveyCtrl
 * @description
 * # SurveyCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('SurveyCtrl',['$scope', 'Surveys', 'Patients', function ($scope, Surveys, Patients) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.surveys = Surveys.getAvailable();
    $scope.patients = Patients.all();
    $scope.selectedSurvey = null;
    $scope.selectedPatient = null;

    $scope.selectSurvey = function ($index) {
        $scope.selectedSurvey = $scope.surveys[$index].id;    
    };

    $scope.selectPatient = function ($index) {
        $scope.selectedPatient = $scope.patients[$index].patientId;
    };

    //TODO: Add functionality to make it required that both are selected.
    $scope.start = function() {
        Surveys.start({surveyId: $scope.selectedSurvey, patientId: $scope.selectedPatient}).$promise.then(function(result) {
            alert(result.pin);
        });
    };
  }]);
