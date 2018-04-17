function myCtrl($scope, $interval, $window, NavbarService, MapService, ChartService, SessionService){
    //Initialize
    /*
    // Probably only want this for a demo
    $scope.username = SessionService.getCurrentUser();
    if($scope.username == null){
        window.location.href = "login.php";
    }
    */
    $scope.username = "kwberner"; // Comment out for demo
    NavbarService.initializeNavbar($scope);
    $scope.selectedVehicle = "0";

    $scope.speedArray = [];
    $scope.labelArray = [];

    window.onload = function(){
        $scope.username = "kwberner";
        initialize();
    }

    //Functions
    function initialize() {
        var url = "http://35.193.191.2:8080/manager/" + $scope.username;
        $.get(url, function(data, status){
            $scope.vehicleIDs = [];
            for(i = 0; i < data.length; i++){
                if(data[i].vid != null){
                    $scope.vehicleIDs.push(data[i].vid);
                }
            }
            MapService.createMap($scope);
            // ChartService.initCharts($scope);
            $scope.collectVehicleDataAndInitializeCharts();
        });
    }

    $scope.collectVehicleData = function(){ // Called whenever newest data is needed after intialization
        console.log("firing collectVehicleData");
        if($scope.vehicleIDs == null){
            return;
        }
        for(i = 0; i < $scope.vehicleIDs.length; i++){
            var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[i];
            $.get(url, function(data, status){
                if (data == null){
                    return;
                }
                if($scope.vehicleData == null){
                    console.log("Error: Vehicle has no data");
                    return;
                }
                $scope.vehicleData.set(data.vid, data);
            });
        }
    }

    $scope.collectVehicleDataAndInitializeCharts = function(){ // Called whenever newest data is needed after intialization
        console.log("firing collectVehicleDataAndInitializeCharts");
        var promises = [];
        for(i = 0; i < $scope.vehicleIDs.length; i++){
            var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[i];
            promises.push($.get(url, function(data, status){}));
        }
        $.when.apply($, promises).then(function(){
            for (var i = $scope.vehicleIDs.length - 1; i >= 0; i--) {
                $scope.vehicleData.set(arguments[i][0].vid, arguments[i][0]);
                // console.log($scope.vehicleIDs);
                // console.log($scope.vehicleData);
            }
            for (i = 0; i < $scope.vehicleIDs.length; i++){
                var key = $scope.vehicleIDs[i];
                // console.log("key: " + key + " val: " + $scope.vehicleData.get(key));
            }
            ChartService.initCharts($scope);
        }, function(){
            //error, ergo - Panic
        });
    }

    $scope.refresh = function(){
        MapService.updateMarkers($scope);
        $scope.collectVehicleData();
    }
    $interval(function(){
        $scope.refresh();
    }, 500);

    $scope.updateCharts = function(){
        ChartService.updateCharts($scope);
    }

    $scope.zoom = function(){
        MapService.zoom($scope);
    }

}//End controller

angular
  .module('myApp', ['NavbarService', 'MapService', 'ChartService', 'SessionService'])
  .controller('myCtrl', myCtrl);
