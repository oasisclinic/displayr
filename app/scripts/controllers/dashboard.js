'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('DashboardCtrl',['$location', '$scope', 'Patients', '$filter', function ($location, $scope, Patients, $filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var orderBy = $filter('orderBy');

    $scope.patients = Patients.all();
    
    $scope.order = function(predicate, reverse) {
        $scope.patients = orderBy($scope.patients, predicate, reverse);
    }

    $scope.routeAddPatient = function () {
        $location.path('/addpatient');
    };

      $scope.routeSurvey = function () {
        $location.path('/survey');
    };

    $scope.routeSearchPatients = function() {
        $location.path('/searchpatients');
    };
  }]);
