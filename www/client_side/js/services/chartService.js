angular.module('ChartService',[])
.service('ChartService',function($interval) {

    this.initCharts = function ($scope) {
        // TODO make this less hacky
        // $scope.vehicleIDs
        // var url = "http://35.193.191.2:8080/vehicle/" + $scope.username;

        var url = "http://35.193.191.2:8080/vehicle/";
        $.get(url, function(data, status){
            var fuelData = [];
            var vehicleLabels = [];
            var vehicleSpeeds = [];
            for(var i = 0; i < data.length; i++){
                var currentVehicle = data[i];
                if($scope.vehicleIDs.indexOf(currentVehicle.uid) != -1){
                    fuelData.push(currentVehicle.mrGas);
                    vehicleSpeeds.push(currentVehicle.mrSpeed);
                    vehicleLabels.push(currentVehicle.uid);
                }
            }
            // console.log("FuelData: " + fuelData);

            var leftCtx = document.getElementById("leftCanvas");
            var leftConfig = {
                type: 'bar',
                data: {
                    labels: vehicleLabels,
                    datasets: [{
                        label: 'Gas',
                        data: fuelData,
                        backgroundColor: 'blue',
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    title:{
                        display:true,
                        text:'Remaining Fuel'
                    },
                    scales: {
                        xAxes: [{
                            display: true
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Gas (gallons)'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            }
            $scope.leftChart = new Chart(leftCtx, leftConfig);
        });



        var rightCtx = document.getElementById("rightCanvas");
        var rightConfig = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [{
                    label: 'Fuel Consumption Over Time',
                    data: [12,19,3,5,2,3],
                    fill: false,
                    backgroundColor: 'red',
                    borderColor: 'red'
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Gas Consumption (Gallons)'
                        }
                    }]
                }
            }
        }
        $scope.rightChart = new Chart(rightCtx, rightConfig);
    };

    this.updateCharts = function($scope) {
        //Clear out old charts
        $scope.leftChart.destroy();
        $scope.rightChart.destroy();

        //Turn off interval if it's active
        if(angular.isDefined($scope.currentSpeedInterval)){
            $interval.cancel($scope.currentSpeedInterval);
            $scope.currentSpeedInterval = undefined;
        }

        if($scope.selectedVehicle == 0){
            ChartService.initCharts($scope);
        }else{
            individualCharts($scope);
        }
    }

    var individualCharts = function($scope) {
        var leftCtx = document.getElementById("leftCanvas");
        var newConfig = {
            type: 'line',
            data: {
                labels: $scope.labelArray,
                datasets: [{
                    label: 'Current Speed',
                    data: $scope.speedArray,
                    fill: false,
                    backgroundColor: 'red',
                    borderColor: 'red'
                }]
            },
            options: {
                responsive: true,
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Speed (MPH)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        }
        $scope.leftChart = new Chart(leftCtx, newConfig);

        var getCurrentSpeed = function(){
            var url = "http://35.193.191.2:8080/vehicle/" + $scope.selectedVehicle;
            $.get(url, function(data, status){
                // console.log("Live mrSpeed: " + data.mrSpeed);
                var fakeSpeed = Math.ceil(55 + Math.random() * 10);
                var speed = data.mrSpeed;
                var fakeLabel = getFormattedTime();
                if($scope.speedArray.length > 15){
                    $scope.speedArray.shift();
                    $scope.labelArray.shift();
                }
                $scope.speedArray.push(speed);
                $scope.labelArray.push(fakeLabel);
                // newConfig.data.datasets.forEach(function(dataset){
                //  dataset.data = $scope.speedArray;
                // });
                $scope.leftChart.update();
            });
        }
        getCurrentSpeed();
        $scope.currentSpeedInterval = $interval(getCurrentSpeed, 500);
    }

    var getFormattedTime = function() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if(minutes < 10){
            minutes = "0" + minutes;
        }
        if(seconds < 10){
            seconds = "0" + seconds;
        }

        return hours + ":" + minutes + ":" + seconds;
    }

});
