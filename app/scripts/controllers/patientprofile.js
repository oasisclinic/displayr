'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('PatientprofileCtrl',
  ['$location', '$scope', 'Patients', 'Surveys', '$routeParams',
  function ($location, $scope, Patients, Surveys, $routeParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.patient = Patients.getPatient({patientId: $routeParams.id});
    $scope.surveys = Surveys.getAvailable();//TODO: We need a method that actually gets the surveys a particular patient has completed.
    $scope.selected;
    $scope.select = function ($index) {
        $scope.selected = $index;
    }

    $scope.routeGraph= function (){
        $location.path('/patientprofile/'+$scope.patient.patientId+'/graph/'+ $scope.surveys[$scope.selected].id);
    }
  }]);
