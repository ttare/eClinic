'use strict';

angular.module('admin')
  .factory('adminServices', function ($http, apiUrl) {
    return {
      getPatientStatistics: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/statistic/patients').then(successCallback, errorCallback);
      },
      getUserStatistics: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/statistic/users').then(successCallback, errorCallback);
      },
      getMonitoringStatistics: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/statistic/monitorigs').then(successCallback, errorCallback);
      }
    }
  });
