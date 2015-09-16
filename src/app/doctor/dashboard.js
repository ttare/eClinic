'use strict';


angular.module('dashboard', [])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('', '/login');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'',
        templateUrl: 'app/doctor/dashboard.template.html',
        controller: 'dashboard.ctrl',
        resolve: {
          profile: function (dashboardServices) {
            return dashboardServices.getProfile(function (data) {
              return data;
            }, function (error) {

            });
          },
          patients: function (dashboardServices) {
            return dashboardServices.getPatients(function (data) {
              return data;
            }, function (error) {

            });
          }
        }
      })
      .state('dashboard.main', {
        url:'/dashboard',
        templateUrl: 'app/doctor/main/dashboard.main.html',
        controller: 'dashboard.main.ctrl'
      })
      .state('dashboard.add', {
        url:'/add',
        templateUrl: 'app/doctor/add/dashboard.add.html',
        controller: 'dashboard.add.ctrl'
      })
      .state('dashboard.details', {
        url:'/details/:name',
        templateUrl: 'app/doctor/details/dashboard.details.html',
        controller: 'dashboard.details.ctrl',
        resolve: {
          patient: function ($stateParams, dashboardServices) {
            var name = $stateParams.name;
            return dashboardServices.getPatientDetails(name, function (data) {
              return data;
            }, function (error) {

            });
          }
        }
      });

  });
