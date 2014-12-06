'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ResponseCtrl', ['$scope', '$stateParams', 'evaluations', function($scope, $stateParams, evaluations) {

        // load evaluations
        $scope.evaluation = evaluations.byId({
            evaluationId: $stateParams.evaluationId
        });

    }]);