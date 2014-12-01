'use strict';

/**
 * @ngdoc function
 * @name frontendMark2App.controller:AddpatientCtrl
 * @description
 * # AddpatientCtrl
 * Controller of the frontendMark2App
 */
angular.module('frontendMark2App')
  .controller('AddpatientCtrl',['Patients', '$scope',  function (Patients, $scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.patient = {
        "firstName": "",
        "lastName": "",
        "medicalId": "",
    };

    $scope.submit = function() {
      Patients.createPatient({}, $scope.patient);  
    }
  }]);
