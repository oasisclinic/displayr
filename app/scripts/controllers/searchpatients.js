'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:SearchpatientsCtrl
 * @description
 * # SearchpatientsCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('SearchpatientsCtrl', function($scope, $filter, $resource, Patients, ngTableParams) {

        // var Patients = $resource('http://localhost:8080/api/patients');
        Patients.all().$promise.then(function(data) {

            $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10,
                filter: {

                },
                sorting: {
                    lastName: 'asc'
                }
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
            console.info(patient);
        };

    });