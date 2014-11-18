'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('LoginCtrl', ['$scope', '$location', '$log', function ($scope, $location, $log) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.username = '';
    $scope.password = '';
    //TODO: OAuth this, make it an actually effective thing.
    $scope.login = function () {
        $location.path('/dashboard');
    }
  }]);
