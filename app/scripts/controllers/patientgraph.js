'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientgraphCtrl
 * @description
 * # PatientgraphCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('PatientgraphCtrl', ['$scope', 'Surveys', '$route', function ($scope, Surveys, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var patientId = $route.current.params.patientid,
        surveyId = $route.current.params.surveyid;

    $scope.results = Surveys.responses({patientId: patientId, surveyId: surveyId});
    
    $scope.$on('$viewContentLoaded', function(event) {
        $('#chartContainer').highcharts({
            title: {
                text: 'Loaded',
            },
        });
    });
    
  }]);
