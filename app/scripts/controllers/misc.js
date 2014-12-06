'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:AddpatientCtrl
 * @description
 * # AddpatientCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ApiModalCtrl', ['$scope', 'message', 'title', function($scope, message, title) {

        $scope.message = message;
        $scope.title = title;
        $scope.close = function() {
            $rootScope.$broadcast('event:api-error-dismiss', null);
        };

    }]);