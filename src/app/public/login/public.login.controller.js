'use strict';

angular.module('public')
  .controller('public.login.ctrl', function ($rootScope, $scope, $state, publicServices, authorizationService) {
      var typeMapper = {
        'PATIENT': 'patient.main',
        'DOCTOR': 'dashboard.main',
        'ADMINISTRATOR' : 'admin.main'
      };

    if ($rootScope.loggedUser) {
      console.log('user', $rootScope.loggedUser);
      $state.go(typeMapper[$rootScope.loggedUser.role]);
    }

    $scope.account = {
      username: 'ttare',
      password: 'ttare'
    };



    $scope.btnLogin = function () {
      publicServices.login($scope.account, function (result) {
        result.data.username = $scope.account.username;
        authorizationService.setData('eClinicUserProfile', result.data);
        $rootScope.loggedUser = result.data;
        $state.go(typeMapper[result.data.role]);
      }, function (error) {

      });
    };



  });
