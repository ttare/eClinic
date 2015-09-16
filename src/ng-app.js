'use strict';

angular.module('app', [
    'ui.router',
    'ngCookies',
    'pascalprecht.translate',
    'oitozero.ngSweetAlert',
    'ngMap',
    'chart.js',
    'public',
    'dashboard',
    'admin',
    'patient'
  ])
  .run(function ($rootScope, $state, $translate, authorizationService) {

    var userProfile = authorizationService.getData('eClinicUserProfile');
    if (userProfile !== null) {
      $rootScope.loggedUser = userProfile;
    }



    $rootScope.$on('showLoader', function (scope, data) {
        $('#loaderDiv').show();
    });

    $rootScope.$on('hideLoader', function (scope, data) {
        $('#loaderDiv').hide();
    });

    $rootScope.logout = function () {
      authorizationService.removeData('eClinicUserProfile');
        $rootScope.loggedUser = null;
      $state.go('login');
    };

    $rootScope.getDate= function (date, format) {
        return moment(date).format(format);
    }

    })
  .factory('myInterceptor', function($rootScope, $q, authorizationService) {
    var numLoadings = 0;

    return {
        request: function (config) {
          var userProfile = authorizationService.getData('eClinicUserProfile');
          if (userProfile && userProfile.Authorization) {
            config.headers['Authorization'] = userProfile.Authorization;
          }

            if (config.headers.loading == undefined) {
                numLoadings++;
                $rootScope.$broadcast('showLoader', {controller: 'myHttpInterceptor'});
            }
            return config;
        },
        response: function (response) {
            if (response.config.headers.loading == undefined) {
                if ((--numLoadings) === 0) {
                    $rootScope.$broadcast('hideLoader', {controller: 'myHttpInterceptor'});
                }
            }
            return response || $q.when(response);
        },
        responseError: function (response) {
            if (response.status === 401) {
                $rootScope.logout();
            }
            if (!(--numLoadings))
                $rootScope.$broadcast('hideLoader', {controller: 'myHttpInterceptor'});
            return $q.reject(response);
        }
    }
  }).config(function ($stateProvider, $urlRouterProvider, $httpProvider, $translateProvider) {

    $urlRouterProvider.when('', '/');
    $httpProvider.interceptors.push('myInterceptor');


    $translateProvider.useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');



    });
