'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:SearchpatientsCtrl
 * @description
 * # SearchpatientsCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('GiveSurveyCtrl', function($scope, $filter, $state, surveys, ngTableParams) {

        surveys.get().$promise.then(function(data) {

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

        $scope.changeSelection = function(survey) {
            $state.go('survey.to', {
                surveyId: survey.id
            });
        };

    })
    .controller('ToSurveyCtrl', function($scope, $filter, $state, $stateParams, patients, ngTableParams) {

        patients.all().$promise.then(function(data) {

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

        $scope.changeSelection = function(patient) {
            $state.go('survey.ready', {
                surveyId: $stateParams.surveyId,
                patientId: patient.patientId
            });
        };

    })
    .controller('SurveyReadyCtrl', function($stateParams, $scope, evaluations) {

        $scope.pin = evaluations.make({
            patientId: $stateParams.patientId,
            surveyId: $stateParams.surveyId
        });

    })
    .controller('TakeSurveyCtrl', function($scope, $http, $window) {

        $scope.pin = function(pinCode) {
            $http.get("http://localhost:8080/api/evaluations/start/" + pinCode)
            .success(function(response) {
                $window.location.href = response.url;
            });
        }

    });