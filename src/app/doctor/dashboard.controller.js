'use strict';

angular.module('dashboard')
  .controller('dashboard.ctrl', function ($rootScope, $scope, $state, authorizationService, profile, patients) {
    $scope.profile = profile.data;
    $scope.patients = patients.data;



      $scope.selectPatient = function (patient) {
        $scope.selectedPatient = patient;
      };





  });
