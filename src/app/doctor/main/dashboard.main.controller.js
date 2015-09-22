'use strict';

angular.module('dashboard')
  .controller('dashboard.main.ctrl', function ($rootScope, $scope, $state, authorizationService, map, dashboardServices, $interval) {
    $scope.positions = map;

    $interval(function () {
        dashboardServices.getPatientsMap(function (result) {
            $scope.positions = result.data;
        }, function (error) {

        });
    }, 5000);
  });

