'use strict';

angular.module('admin')
  .controller('admin.ctrl', function ($rootScope, $scope, $state, authorizationService, profile, userStatistics, patientStatistics, monitoringStatistics) {
    $scope.profile = profile.data;
    $scope.userStatistics = userStatistics.data;
    $scope.patientStatistics = patientStatistics.data;
    $scope.monitoringStatistics = monitoringStatistics.data;







  });
