'use strict';

angular.module('dashboard')
  .factory('dashboardServices', function ($http, apiUrl) {
    return {
      getProfile: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/me').then(successCallback, errorCallback);
      },
      getPatients: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/doctor/patients').then(successCallback, errorCallback);
      },
      getPatientsMap: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/patients/map', { headers: {loading: false}}).then(successCallback, errorCallback);
      },
      getPatientDetails: function (id, successCallback, errorCallback) {
        return $http.get(apiUrl + '/patient?id='+id).then(successCallback, errorCallback);
      },
      getPatientStats: function (id, successCallback, errorCallback) {
        return $http.get(apiUrl + '/patients/stats?id='+id, { headers: {loading: false}}).then(successCallback, errorCallback);
      },
      getPatientHeart: function (id, successCallback, errorCallback) {
        return $http.get(apiUrl + '/patients/heart?id='+id, { headers: {loading: false}}).then(successCallback, errorCallback);
      },
      addPatient: function (patient, successCallback, errorCallback) {
        $http.post(apiUrl + '/patients/add', patient).then(successCallback, errorCallback);
      },
      getPatientMap: function (successCallback, errorCallback) {
        return $http.get(apiUrl + '/patient/map').then(successCallback, errorCallback);
      },
      getMonitoringDetails: function (id, successCallback, errorCallback) {
        return $http.get(apiUrl + '/getmonitoring?id=' + id).then(successCallback, errorCallback);
      },
      finishMonitoring: function (id, successCallback, errorCallback) {
        return $http.get(apiUrl + '/monitoring/finished/' + id).then(successCallback, errorCallback);
      },
      addMonitoring: function (monitoring, successCallback, errorCallback) {
        $http.post(apiUrl + '/monitorings/add', monitoring).then(successCallback, errorCallback);
      }


    }
  });
