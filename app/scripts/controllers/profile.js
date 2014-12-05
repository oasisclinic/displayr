'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:PatientprofileCtrl
 * @description
 * # PatientprofileCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
    .controller('ProfileCtrl', ['$location', '$scope', 'Surveys', '$routeParams', '$stateParams', 'patients',
        function($location, $scope, Surveys, $routeParams, $stateParams, patients) {

          patients.get($stateParams.patientId).$promise.then(function(data) {

          });
            
            $scope.surveys = Surveys.getAvailable(); //TODO: We need a method that actually gets the surveys a particular patient has completed.
            $scope.selected;
            $scope.select = function($index) {
                $scope.selected = $index;
            }

            $scope.routeGraph = function() {
                $location.path('/patientprofile/' + $scope.patient.patientId + '/graph/' + $scope.surveys[$scope.selected].id);
            }
        }
    ]);