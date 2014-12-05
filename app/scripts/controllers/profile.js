'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ProfileCtrl', function($scope, $stateParams, $filter, patients, evaluations, ngTableParams) {

        // load patient
        $scope.patient = patients.get({
            patientId: $stateParams.patientId
        });

        // loat evaluations
        evaluations.byPatientId({
            patientId: $stateParams.patientId
        }).$promise.then(function(data) {
            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10
            }, {
                total: 0,
                getData: function($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                        $filter('filter')(data, params.filter()) :
                        $scope.data;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')(filteredData, params.orderBy()) :
                        $scope.data;

                    params.total(orderedData.length); // set total for recalc pagination
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            $scope.data = data;
        });

        $scope.loadGraph = function(surveyId) {
            evaluations.bySurveyId({
                patientId: $stateParams.patientId,
                surveyId: surveyId,
            }).$promise.then(function(data) {
                
                console.log(data);

                $scope.chartData = data;
            });
        };

        //   $scope.surveys = Surveys.getAvailable(); //TODO: We need a method that actually gets the surveys a particular patient has completed.
        //   $scope.selected;
        //   $scope.select = function($index) {
        //       $scope.selected = $index;
        //   }

        //   $scope.routeGraph = function() {
        //       $location.path('/patientprofile/' + $scope.patient.patientId + '/graph/' + $scope.surveys[$scope.selected].id);
        //   }
    });