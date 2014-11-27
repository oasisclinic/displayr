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

//Configuration for the DatePicker Pop Up:http://angular-ui.github.io/bootstrap/#/datepicker
    $scope.today = function() {
        $scope.date = new Date();
    }

    $scope.today();

    $scope.clearDate = function () {
        $scope.date = null;
    }

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    }

    $scope.dateFormat = 'dd-MMMM-yyyy';

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
//End Date Picker Configuration

    $scope.submit = function() {
      var postObj = {patient: {
        "patientId": $scope.patientId,
        "medicalId": $scope.medId,
        "firstName": $scope.firstName,
        "lastName" : $scope.lastName,
        "lastInteraction": $scope.lastInteraction
      }};
      Patients.createPatient(postObj);  
    }
  }]);
