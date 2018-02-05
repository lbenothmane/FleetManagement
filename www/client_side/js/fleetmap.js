function myCtrl($scope, $interval, MapService, ChartService, SessionService){
    //Initialize
    $scope.username = SessionService.getCurrentUser();
    $scope.selectedVehicle = "0";

    $scope.speedArray = [];
    $scope.labelArray = [];

    window.onload = function(){
        initialize();
    }

    //Functions
    function initialize() {
        var url = "http://35.193.191.2:8080/manager/" + $scope.username;
        $.get(url, function(data, status){
            $scope.vehicleIDs = [];
            for(i = 0; i < data.length; i++){
                if(data[i].uid != null){
                    $scope.vehicleIDs.push(data[i].uid);
                }
            }
            MapService.createMap($scope);
            ChartService.initCharts($scope);
        });
    }

    $scope.refresh = function(){
        MapService.updateMarkers($scope);
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
  .module('myApp', ['MapService', 'ChartService', 'SessionService'])
  .controller('myCtrl', myCtrl);
