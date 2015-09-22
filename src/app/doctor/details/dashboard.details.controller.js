'use strict';

angular.module('dashboard')
    .controller('dashboard.details.ctrl', function ($rootScope, $scope, $interval, $stateParams, patient, monitoring, dashboardServices) {
        $scope.patientDetails = patient.data;
        $scope.monitoring = monitoring.data;
        var id = $stateParams.name;

        $scope.finishMonitoring = function () {
            dashboardServices.finishMonitoring(id, function (result) {
                $scope.monitoring.finished = 1;
                $interval.cancel(getHeartFunction);
                $interval.cancel(getPresureFunction);
            }, function (error) {

            });
        };

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
            if (presure.anomaly_priority) {
                $scope.notifications[1] = {
                    priority: presure.anomaly_priority,
                    text: presure.anomaly_notification
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
                $scope.presureData[0].splice(0, 7);
                $scope.presureData[1].splice(0, 7);
                $scope.presureLabels.splice(0, 7);
                $scope.temperatureData[0].splice(0, 7);
                $scope.temperatureLabels.splice(0, 7);
            }
            $scope.presureData[0].push(presure.diastolic);
            $scope.presureData[1].push(presure.systolic);
            $scope.presureLabels.push(moment().format('HH:mm'));

            $scope.temperatureData[0].push(temperature.value);
            $scope.temperatureLabels.push(moment().format('HH:mm'));
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
            if (heart.anomaly_priority) {
                $scope.notifications[2] = {
                    priority: heart.anomaly_priority,
                    text: heart.anomaly_notification
                };
            }

            if ($scope.heartData[0].length == 15) {
                $scope.heartData[0].splice(0, 7);
                $scope.heartLabels.splice(0, 7);
            }
            $scope.heartData[0].push(heart.value);
            $scope.heartLabels.push(moment().format('HH:mm:ss'));


        }, function (error) {

        });

        $scope.presureColor =['#2C719E', '#063E62'];
        $scope.temperatureColor =['#FF0000'];
        $scope.heartColor =['#740808'];



        var getHeartFunction = $interval(function () {
            dashboardServices.getPatientHeart(id, function (result) {
                var heart = result.data;

                if (heart.anomaly_priority) {
                    $scope.notifications[2] = {
                        priority: heart.anomaly_priority,
                        text: heart.anomaly_notification
                    };
                }

                if ($scope.heartData[0].length == 15) {
                    $scope.heartData[0].splice(0, 7);
                    $scope.heartLabels.splice(0, 7);
                }
                $scope.heartData[0].push(heart.value);
                $scope.heartLabels.push(moment().format('HH:mm:ss'));


            }, function (error) {

            });
        }, 1000);


        var getPresureFunction = $interval(function () {
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
                if (presure.anomaly_priority) {
                    $scope.notifications[1] = {
                        priority: presure.anomaly_priority,
                        text: presure.anomaly_notification
                    };
                }

                if ($scope.presureData[0].length == 15) {
                    $scope.presureData[0].splice(0, 7);
                    $scope.presureData[1].splice(0, 7);
                    $scope.presureLabels.splice(0, 7);
                    $scope.temperatureData[0].splice(0, 7);
                    $scope.temperatureLabels.splice(0, 7);
                }
                $scope.presureData[0].push(presure.diastolic);
                $scope.presureData[1].push(presure.systolic);
                $scope.presureLabels.push(moment().format('HH:mm'));

                $scope.temperatureData[0].push(temperature.value);
                $scope.temperatureLabels.push(moment().format('HH:mm'));
            }, function (error) {

            });
        }, 5000);

        $scope.$on('$destroy', function () {
            $interval.cancel(getHeartFunction);
        });
        $scope.$on('$destroy', function () {
            $interval.cancel(getPresureFunction);
        });

    });
