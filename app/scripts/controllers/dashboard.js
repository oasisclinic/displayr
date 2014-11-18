'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('DashboardCtrl',['$location', '$scope', 'Patients', function ($location, $scope, Patients) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    console.log("yo");
    $scope.patients = Patients.all();

    $scope.routeAddPatient = function () {
        $location.path('/addpatient');
    };

    $scope.routePatientProfile = function (pid) {
        $location.path('/profile/' + pid);
    };

    $scope.routeSurvey = function () {
        $location.path('/givesurvey');
    };
  }]);
