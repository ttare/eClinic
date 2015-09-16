'use strict';

angular.module('public')
  .factory('publicServices', function ($http, apiUrl) {
    return {
      login: function (credentials, successCallback, errorCallback) {
        return $http.post(apiUrl + '/login', credentials).then(successCallback, errorCallback);
      }
    }
  });
