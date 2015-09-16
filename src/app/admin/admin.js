'use strict';


angular.module('admin', [])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('admin', {
        url:'',
        templateUrl: 'app/admin/dashboard.template.html',
        controller: 'admin.ctrl',
        resolve: {
          profile: function (dashboardServices) {
            return dashboardServices.getProfile(function (data) {
              return data;
            }, function (error) {

            });
          },
          userStatistics: function (adminServices) {
            return adminServices.getUserStatistics(function (data) {
              return data;
            }, function (error) {

            });
          },
          patientStatistics: function (adminServices) {
            return adminServices.getPatientStatistics(function (data) {
              return data;
            }, function (error) {

            });
          },
          monitoringStatistics: function (adminServices) {
            return adminServices.getMonitoringStatistics(function (data) {
              return data;
            }, function (error) {

            });
          }
        }
      })
      .state('admin.main', {
        url:'/admin',
        templateUrl: 'app/admin/main/admin.main.html',
        controller: 'admin.main.ctrl'
      })
      .state('admin.details', {
        url:'/details/:name',
        templateUrl: 'app/admin/details/dashboard.details.html',
        controller: 'admin.details.ctrl',
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
