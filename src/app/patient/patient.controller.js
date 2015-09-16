'use strict';

angular.module('patient')
  .controller('patient.ctrl', function ($rootScope, $scope, $state, authorizationService, profile) {
    $scope.profile = profile.data;







  });
