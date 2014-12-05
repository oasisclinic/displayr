'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('HomeCtrl', function($scope, $stateParams, $filter, evaluations, ngTableParams) {

            // load evaluations
            evaluations.recent({
                limit: 20
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

    });