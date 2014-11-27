'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:ModalerrorCtrl
 * @description
 * # ModalerrorCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('ModalerrorCtrl', ['$scope', '$modalInstance', 'error', 'body', function ($scope, $modalInstance,  error, body) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.error = error;

    $scope.body = body;

    $scope.ok = function() {
        $modalInstance.close();
    }
  }]);
