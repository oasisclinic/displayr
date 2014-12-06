'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ProfileCtrl', ['$scope', '$stateParams', '$filter', 'patients', 'evaluations', 'ngTableParams', function($scope, $stateParams, $filter, patients, evaluations, ngTableParams) {

            // load evaluations
            evaluations.byPatientId({
                patientId: $stateParams.patientId
            }).$promise.then(function(data) {
                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    total: 0,
                    getData: function($defer, params) {
                        var filteredData = params.filter() ?
                            $filter('filter')($scope.data, params.filter()) :
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

            $scope.remove = function(evaluationId) {
                evaluations.remove({
                    evaluationId: evaluationId
                }).$promise.then(function(data) {
                        for (var i = 0; i < $scope.data.length; i++) {
                            if ($scope.data[i].evaluationId === evaluationId) {
                                $scope.data.splice(i, 1);
                            break;
                        }
                    }
                    $scope.tableParams.reload();
                });
        };

    }]);