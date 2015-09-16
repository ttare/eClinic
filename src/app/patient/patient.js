'use strict';


angular.module('patient', [])
  .config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
      .state('patient', {
        url:'',
        templateUrl: 'app/patient/dashboard.template.html',
        controller: 'patient.ctrl',
        resolve: {
          profile: function (dashboardServices) {
            return dashboardServices.getProfile(function (data) {
              return data;
            }, function (error) {

            });
          }
        }
      })
      .state('patient.main', {
        url:'/profile',
        templateUrl: 'app/patient/main/patient.main.html',
        controller: 'patient.main.ctrl'
      });

  });
