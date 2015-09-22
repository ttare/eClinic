'use strict';

angular.module('dashboard')
    .controller('dashboard.monitoring.ctrl', function ($rootScope, $scope, $interval, $state, $stateParams, dashboardServices) {
        $scope.monitoring = {
            dateTime: moment().format('DD-MM-YYYY'),
            patientId: $stateParams.name
        };


        $scope.addPatient = function () {
            dashboardServices.addMonitoring($scope.monitoring, function (result) {
                $state.go('dashboard.main');
            }, function (error) {

            });
        }



    });
