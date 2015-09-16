'use strict';


angular.module('public', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/public/login/public.login.html',
        controller: 'public.login.ctrl'
      });
  });
