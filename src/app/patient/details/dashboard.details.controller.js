'use strict';

angular.module('dashboard')
    .controller('dashboard.details.ctrl', function ($rootScope, $scope, $interval, $stateParams, patient, dashboardServices) {
        $scope.patientDetails = patient.data;
        var id = $scope.patientDetails.id;

        $scope.presureLabels = [];
        $scope.presureSeries = ['Diastolic', 'Sistolic'];
        $scope.presureData = [
            [],
            []
        ];

        $scope.temperatureLabels = [];
        $scope.temperatureSeries = ['Temperature'];
        $scope.temperatureData = [
            []
        ];


        $scope.notifications = [{}, {}, {}];

        dashboardServices.getPatientStats(id, function (result) {
            //0
            var temperature = result.data[0];
            var presure = result.data[1];

            if (temperature.anomaly_priority) {
                $scope.notifications[0] = {
                    priority: temperature.anomaly_priority,
                    text: temperature.anomaly_notification
                };
            }
            /*            anomaly_notification: "Patient Tarik Kaldžija has temperature over 37."
             anomaly_priority: "LOW"
             diastolic: -1
             monitoring_id: 3
             systolic: -1
             value: 37.2
             vital_function: "Temperature"
             diastolic: 80
             monitoring_id: 3
             systolic: 130
             vital_function_id: 2*/
            if ($scope.presureData[0].length == 15) {
                $scope.presureData[0].splice(7, 14);
                $scope.presureData[1].splice(7, 14);
                $scope.presureLabels.splice(7, 14);
                $scope.temperatureData[0].splice(7, 14);
                $scope.temperatureLabels.splice(7, 14);
            }
            $scope.presureData[0].push(presure.diastolic);
            $scope.presureData[1].push(presure.systolic);
            $scope.presureLabels.push(moment().format('HH:MM'));

            $scope.temperatureData[0].push(temperature.value);
            $scope.temperatureLabels.push(moment().format('HH:MM'));
        }, function (error) {

        });



        $scope.heartLabels = [];
        $scope.heartSeries = ['Heart'];
        $scope.heartData = [
            []
        ];
        $scope.heartColors = ['Blue'];

        dashboardServices.getPatientHeart(id, function (result) {
            var heart = result.data;
            /*            anomaly_notification: null
             anomaly_priority: null
             diastolic: -1
             monitoring_id: 3
             systolic: -1
             value: 1.2
             vital_function: "Heart rate"
             vital_function_id: 1*/

            if ($scope.heartData[0].length == 15) {
                $scope.heartData[0].splice(7, 14);
                $scope.heartLabels.splice(7, 14);
            }
            $scope.heartData[0].push(heart.value);
            $scope.heartLabels.push(moment().format('HH:MM:ss'));


        }, function (error) {

        });





        var getHeartFunction = $interval(function () {
            dashboardServices.getPatientHeart(id, function (result) {
                var heart = result.data;
                /*            anomaly_notification: null
                 anomaly_priority: null
                 diastolic: -1
                 monitoring_id: 3
                 systolic: -1
                 value: 1.2
                 vital_function: "Heart rate"
                 vital_function_id: 1*/

                if ($scope.heartData[0].length == 15) {
                    $scope.heartData[0].splice(7, 14);
                    $scope.heartLabels.splice(7, 14);
                }
                $scope.heartData[0].push(heart.value);
                $scope.heartLabels.push(moment().format('HH:MM:ss'));


            }, function (error) {

            });
        }, 1000);


        var getPresureFunction = $interval(function () {
            dashboardServices.getPatientStats(id, function (result) {
                //0
                var temperature = result.data[0];
                var presure = result.data[1];
                /*            anomaly_notification: "Patient Tarik Kaldžija has temperature over 37."
                 anomaly_priority: "LOW"
                 diastolic: -1
                 monitoring_id: 3
                 systolic: -1
                 value: 37.2
                 vital_function: "Temperature"
                 vital_function_id: 2*/
                if ($scope.presureData[0].length == 15) {
                    $scope.presureData[0].splice(7, 14);
                    $scope.presureData[1].splice(7, 14);
                    $scope.presureLabels.splice(7, 14);
                    $scope.temperatureData[0].splice(7, 14);
                    $scope.temperatureLabels.splice(7, 14);
                }
                $scope.presureData[0].push(presure.diastolic);
                $scope.presureData[1].push(presure.systolic);
                $scope.presureLabels.push(moment().format('HH:MM'));

                $scope.temperatureData[0].push(temperature.value);
                $scope.temperatureLabels.push(moment().format('HH:MM'));
            }, function (error) {

            });
        }, 60000);

        $scope.$on('$destroy', function () {
            $interval.cancel(getHeartFunction);
        });
        $scope.$on('$destroy', function () {
            $interval.cancel(getPresureFunction);
        });

    });
