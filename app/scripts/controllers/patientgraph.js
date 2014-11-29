'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientgraphCtrl
 * @description
 * # PatientgraphCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('PatientgraphCtrl', ['$scope', 'Surveys', 'Patients',  '$route', function ($scope, Surveys, Patients, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    var patientId = $route.current.params.patientid,
        surveyId = $route.current.params.surveyid;

    $scope.patient = Patients.get({patientId: patientId});
    
    function unpackResults(results){
        var graphSeries = [];
        var defKeys = Object.keys(results.definition);
        
        //sorts by date in ascending order.
        //Points: [data, date]
        function dateCompare (a,b) {
            return a[0] - b[0];
        }
        //Make all definitions into highcharts buckets
        defKeys.forEach(function (key) {
            graphSeries[key] = { name: results.definition[key] };
            graphSeries[key].data = [];
            results.data.forEach(function(point){
                graphSeries[key].data.push([point.date, point.data[key]]);
            });
            graphSeries[key].data.sort(dateCompare);

        });


        return graphSeries;
    }

    $scope.toggle = function($index) {
        $scope.selected[$index] = !$scope.selected[$index];
        var chart = $('#graphContainer').highcharts();
        //Adding in
        if($scope.selected[$index]) {
            chart.addSeries($scope.series[$index]);
            chart.redraw();
        } else {
            chart.series.forEach(function(serie) {
                if(serie.name === $scope.series[$index].name) {
                    serie.remove(true);
                }
            });
        }
    }

    //Everything happens inside this event block.
    $scope.$on('$viewContentLoaded', function(event) {
            $scope.results = Surveys.responses({patientId: patientId, surveyId: surveyId});
            //Now we wait for our survey data to load.
            $scope.results.$promise.then(function(results) {
                $scope.series = unpackResults(results);
                $scope.selected = $scope.series.map(function() { return false}); //nothing is selected
                var chart = $('#graphContainer').highcharts({
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: $scope.patient.firstName + ' ' + $scope.patient.lastName
                    },
                    xAxis: {
                        type: 'datetime',
                    },
                    series: []
                });
            });
    });
    

  }]);
