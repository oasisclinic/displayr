'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:AddpatientCtrl
 * @description
 * # AddpatientCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('AddPatientCtrl', ['$scope', '$modal', '$state', 'patients', function($scope, $modal, $state, patients) {

        $scope.patient = null;

        $scope.submit = function(patient) {
            patients.createPatient({}, patient).$promise.then(function(data) {
                var modal = $modal.open({
                    templateUrl: 'views/modals/generic-modal.html',
                    resolve: {
                        message: function() {
                            return 'Patient ' + data.firstName + ' ' + data.lastName + ' was successfully created.';
                        },
                        title: function() {
                            return 'Success!'
                        }
                    },
                    controller: function($scope, message, title) {
                        $scope.message = message;
                        $scope.title = title;
                    }
                });
                modal.result.then(null, function() {
                    $state.go('home', {});
                });
            });
        };

    }]);