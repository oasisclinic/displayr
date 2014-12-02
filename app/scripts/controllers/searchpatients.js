'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:SearchpatientsCtrl
 * @description
 * # SearchpatientsCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('SearchpatientsCtrl',['$scope', 'Patients', 'ngTableParams', '$filter', function ($scope, Patients, ngTableParams, $filter) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var request = Patients.all();
    $scope.patients = request;
    $scope.filters = {
        lastName: '',
        firstName: ''
    };

    $scope.tableParams = new ngTableParams({
                page: 1,
                count: 10,
                filter: $scope.filters,
                sorting: {
                    lastName: 'asc'
                }
        }, {
            total: request.length,
            getData: function ($defer, params) {
                request.$promise.then(function(data) {
                        var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                        var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : orderedData;

                        $scope.patients = filteredData;//orderedData.slice((params.page() - 1) * params.count(), params.page() *params.count);
                        // params.total(orderedData.length);
                        $defer.resolve($scope.patients);
                });
            }
    });
  }
  
]);
