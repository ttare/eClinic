'use strict';

angular.module('dashboard')
    .controller('dashboard.add.ctrl', function ($rootScope, $scope, $interval, $state, $stateParams, dashboardServices) {
        $scope.patientDetails = {
            type_id: 1
        };

        $scope.addPatient = function () {
            dashboardServices.addPatient($scope.patientDetails, function (result) {
                $scope.patients.push($scope.patientDetails);
                $state.go('dashboard.main');
            }, function (error) {

            });
        }



    });
