'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ChartCtrl', function($scope, $stateParams, $filter, patients, evaluations) {

        // charting

        // $scope.addPoints = function() {
        //     var seriesArray = $scope.chartConfig.series
        //     var rndIdx = Math.floor(Math.random() * seriesArray.length);
        //     seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20])
        // };

        evaluations.bySurveyId({
            patientId: $stateParams.patientId,
            surveyId: $stateParams.surveyId,
        }).$promise.then(function(data) {

            var allData = extract(data);
            $scope.addSeries(allData[0]);
            $scope.addSeries(allData[1]);
            console.log(allData[0].data);
            $scope.toggleLoading();

        });

        function extract(response) {

            var allData = [];

            for (var question in response.definition) {
                allData[question] = {
                    name: response.definition[question],
                    data: []
                }
                response.data.forEach(function(point) {
                    allData[question].data.push([point.date, point.data[question]]);
                });
                //allData[question] = (question == 0) ? true : false;
            }

            return allData;

        }

        $scope.addSeries = function(data) {
            if (!$scope.chartConfig.series) {
                $scope.chartConfig.series = [];
            }

            console.log($scope.chartConfig.series.length);
            $scope.chartConfig.series.push(data);
        }

        $scope.removeSeries = function(index) {
            var seriesArray = $scope.chartConfig.series
            seriesArray.splice(index, 1)
        }

        // $scope.removeRandomSeries = function() {
        //     var seriesArray = $scope.chartConfig.series
        //     var rndIdx = Math.floor(Math.random() * seriesArray.length);
        //     seriesArray.splice(rndIdx, 1)
        // }

        $scope.toggleLoading = function() {
            this.chartConfig.loading = !this.chartConfig.loading
        }

        $scope.chartConfig = {
            options: {
                chart: {
                    type: 'spline',
                    zoomType: 'x'
                }
            },
            series: null,
            
            title: {
                text: 'Hello'
            },
            xAxis: {
                dateTimeLabelFormats:
                {
                    millisecond: '%m\/%d\/%y %H:%M',
                    second: '%m\/%d\/%y %H:%M',
                    minute: '%m\/%d\/%y %H:%M',
                    hour: '%m\/%d\/%y %H:%M',
                    day: '%m\/%d\/%y',
                    week: '%m\/%Y',
                    month: '%m\/%Y',
                    year: '%Y'
            },
                type: 'datetime',
            },
            loading: true
        }

    });