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
    function unpackResults(results){
        var graphSeries = {};
        var defKeys = Object.keys(results.definition);

        //Make all definitions into highcharts buckets
        defKeys.forEach(function (key) {
            graphSeries[key] = { name: results.definition[key] };
            graphSeries[key].data = [];
            results.data.forEach(function(point){
                graphSeries[key].data.push([point.data[key], point.date]);
            });
        });


        return graphSeries;
    }

    $scope.$on('$viewContentLoaded', function(event) {
            $scope.results = Surveys.responses({patientId: patientId, surveyId: surveyId});
            $scope.results.$promise.then(function(results) {
                console.log(results);
                var series = unpackResults(results);
                console.log(series);
            });
    });
    

  }]);
