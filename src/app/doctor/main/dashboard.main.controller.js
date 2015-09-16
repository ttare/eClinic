'use strict';

angular.module('dashboard')
  .controller('dashboard.main.ctrl', function ($rootScope, $scope, $state, authorizationService, dashboardServices, $timeout) {
      dashboardServices.getPatientsMap(function (result) {
        $scope.positions = result.data;
      }, function (error) {

      });


  });
