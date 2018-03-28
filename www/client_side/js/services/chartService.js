angular.module('ChartService',[])
.service('ChartService',function($interval) {

    this.initCharts = function ($scope) {
        // TODO make this less hacky
        // $scope.vehicleIDs
        // var url = "http://35.193.191.2:8080/vehicle/" + $scope.username;

        //var fleetCharts = JSON.parse(localStorage.getItem("fleetCharts"));
        var url = "http://35.193.191.2:8080/fleetCharts/" + $scope.username;
        $.get(url, function(data, status){
            var fleetCharts = JSON.parse(data);
            $scope.fleetSelection = JSON.parse(data);
            if(fleetCharts.indexOf("Remaining Fuel") > -1){
                remainingFuelChart($scope);
            }
            if(fleetCharts.indexOf("Gas Consumption") > -1){
                gasConsumptionChart($scope);
            }
        });
        
    };

    var individualCharts = function($scope) {
        // var vehicleCharts = JSON.parse(localStorage.getItem("vehicleCharts"));
        // if(vehicleCharts.indexOf("Current Speed") > -1){
        //     currentSpeedChart($scope);
        // }
        var url = "http://35.193.191.2:8080/vehicleCharts/" + $scope.username;
        $.get(url, function(data, status){
            var vehicleCharts = JSON.parse(data);
            $scope.vehicleSelection = JSON.parse(data);
            if(vehicleCharts.indexOf("Current Speed") > -1){
                currentSpeedChart($scope);
            }
        });
    }

    this.updateCharts = function($scope) {
        //Clear out old charts
        if($scope.remainingFuelChart){
            $scope.remainingFuelChart.destroy();
        }
        if($scope.gasConsumptionChart){
            $scope.gasConsumptionChart.destroy();
        }
        if($scope.currentSpeedChart){
            $scope.currentSpeedChart.destroy();
        }

        //Turn off interval if it's active
        if(angular.isDefined($scope.currentSpeedInterval)){
            $interval.cancel($scope.currentSpeedInterval);
            $scope.currentSpeedInterval = undefined;
        }

        if($scope.selectedVehicle == 0){
            this.initCharts($scope);
        }else{
            individualCharts($scope);
        }
    }

    var remainingFuelChart = function($scope){
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

            var context = document.getElementById("remainingFuelCanvas");
            var config = {
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
            $scope.remainingFuelChart = new Chart(context, config);
        });
    }

    var gasConsumptionChart = function($scope){
        var context = document.getElementById("gasConsumptionCanvas");
        var config = {
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
        $scope.gasConsumptionChart = new Chart(context, config);
    }

    var currentSpeedChart = function($scope){
        var context = document.getElementById("currentSpeedCanvas");
        var config = {
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
        $scope.currentSpeedChart = new Chart(context, config);

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
                $scope.currentSpeedChart.update();
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
