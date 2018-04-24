angular.module('ChartService',[])
.service('ChartService',function($interval) {

    this.initCharts = function ($scope) {
        var fleetCharts = JSON.parse(localStorage.getItem("fleetCharts"));
        if(fleetCharts == null){
            fleetCharts = ['Remaining Fuel', 'Gas Consumption'];
            localStorage.setItem("fleetCharts", JSON.stringify(fleetCharts));
        }
        if(fleetCharts.indexOf("Remaining Fuel") > -1){
            remainingFuelChart($scope);
        }
        if(fleetCharts.indexOf("Gas Consumption") > -1){
            gasConsumptionChart($scope);
        }
    };

    var individualCharts = function($scope) {
        var vehicleCharts = JSON.parse(localStorage.getItem("vehicleCharts"));
        if(vehicleCharts == null){
            vehicleCharts = ['Current Speed', 'Engine Temperature', 'Engine Load'];
            localStorage.setItem("vehicleCharts", JSON.stringify(vehicleCharts));
        }
        if(vehicleCharts.indexOf("Current Speed") > -1){
            currentSpeedChart($scope);
        }
        if(vehicleCharts.indexOf("Engine Temperature") > -1){
            engineTemperatureChart($scope);
        }
        if(vehicleCharts.indexOf("Engine Load") > -1){
            engineLoadChart($scope);
        }
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
        if($scope.engineTemperatureChart){
            $scope.engineTemperatureChart.destroy();
        }
        if($scope.engineLoadChart){
            $scope.engineLoadChart.destroy();
        }

        //Turn off interval if it's active
        if(angular.isDefined($scope.currentSpeedInterval)){
            $interval.cancel($scope.currentSpeedInterval);
            $scope.currentSpeedInterval = undefined;
        }
        if(angular.isDefined($scope.engineTempInterval)){
            $interval.cancel($scope.engineTempInterval);
            $scope.engineTempInterval = undefined;
        }
        if(angular.isDefined($scope.engineLoadInterval)){
            $interval.cancel($scope.engineLoadInterval);
            $scope.engineLoadInterval = undefined;
        }

        if($scope.selectedVehicle == 0){
            this.initCharts($scope);
        }else{
            individualCharts($scope);
        }
    }

    var remainingFuelChart = function($scope){
        var gasData = [];
        for (i = 0; i < $scope.vehicleIDs.length; i++){
            gasData[i] = $scope.vehicleData.get($scope.vehicleIDs[i]).mrGas;
        }


        var context = document.getElementById("remainingFuelCanvas");
        var config = {
            type: 'bar',
            data: {
                labels: $scope.vehicleIDs,
                datasets: [{
                    label: 'Gas',
                    data: gasData,
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
                        display: true,
                        categorySpacing: 0,
                        barPercentage: 0.35
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
            var id = Number($scope.selectedVehicle);
            var data = $scope.vehicleData.get(id);
            // var speed = Math.ceil(55 + Math.random() * 10);
            var speed = data.mrSpeed;
            var label = getFormattedTime();

            if($scope.speedArray.length > 15){
                $scope.speedArray.shift();
                $scope.labelArray.shift();
            }
            $scope.speedArray.push(speed);
            $scope.labelArray.push(label);
            $scope.currentSpeedChart.update();
        }
        getCurrentSpeed();
        $scope.currentSpeedInterval = $interval(getCurrentSpeed, 500);
    }

    var engineTemperatureChart = function($scope){
        // var engineTemperature = 50;
        // var engineTemperatureMaxThreshold = 65;
        console.log($scope.vehicleData.get(Number($scope.selectedVehicle)))
        var engineTemperature = $scope.vehicleData.get(Number($scope.selectedVehicle)).mrEngineTemp;
        var engineTemperatureMaxThreshold = 185;

        var context = document.getElementById("engineTemperatureCanvas");
        var chartData = {
            labels: ['Engine Temperature'],
            datasets: [{
                label: 'Engine Temperature',
                data: [engineTemperature],
                backgroundColor: getEngineTemperatureColor(engineTemperature, engineTemperatureMaxThreshold),
                borderColor: 'black',
                borderWidth: 1
            }]
        };

        var config = {
            type: 'bar',
            data: chartData,
            options: {
                title:{
                    display:true,
                    text:'Engine Temperature'
                },
                scales: {
                    xAxes: [{
                        display: true,
                        categorySpacing: 0,
                        barPercentage: 0.35
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Temperature (degrees Fahrenheit)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        $scope.engineTemperatureChart = new Chart(context, config);

        var getCurrentEngineTemp = function(){
            var id = Number($scope.selectedVehicle);
            var data = $scope.vehicleData.get(id);
            var engineTemp = data.mrEngineTemp;

            config.data.datasets.forEach(function(dataset) {
                dataset.data = [engineTemp];
                dataset.backgroundColor = [getEngineTemperatureColor(engineTemp, 185)];
            });
            $scope.engineTemperatureChart.update();
        }
        getCurrentEngineTemp();
        $scope.engineTempInterval = $interval(getCurrentEngineTemp, 500);
    }

    var engineLoadChart = function($scope){
        var engineLoad = $scope.vehicleData.get(Number($scope.selectedVehicle)).mrEngineLoad;
        engineLoad = Math.round(engineLoad);

        var context = document.getElementById("engineLoadCanvas");

        var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        engineLoad,
                        100 - engineLoad
                    ],
                    backgroundColor: [
                        getEngineLoadColor(engineLoad),
                        window.chartColors.white
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    "Engine Load"
                ]
            },
            options: {
                responsive: true
            }
        };

        $scope.engineLoadChart = new Chart(context, config);

        var getCurrentEngineLoad = function(){
            var id = Number($scope.selectedVehicle);
            var data = $scope.vehicleData.get(id);
            var engineLoad = data.mrEngineLoad;

            config.data.datasets.forEach(function(dataset) {
                dataset.data = [engineLoad, 100-engineLoad];
                dataset.backgroundColor = [getEngineLoadColor(engineLoad), window.chartColors.white];
            });
            $scope.engineLoadChart.update();
        }
        getCurrentEngineLoad();
        $scope.engineLoadInterval = $interval(getCurrentEngineLoad, 500);
    }

    var getEngineTemperatureColor = function(engineTemperature, engineTemperatureMaxThreshold){
        if(engineTemperature <= engineTemperatureMaxThreshold){
            return "Green";
        }else{
            return "Red";
        }
    }

    var getEngineLoadColor = function(engineLoad){
        if(engineLoad <= 20) {
            return "Blue";
        }else if(engineLoad <= 40){
            return "Green";
        }else if(engineLoad <= 60){
            return "Yellow";
        }else if(engineLoad <= 80){
            return "Orange";
        }else{
            return "Red";
        }
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
