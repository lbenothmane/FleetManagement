function editFleetCtrl($scope, $http, $interval, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);
    // $scope.username = SessionService.getCurrentUser();
    $scope.username = "kwberner"; // TODO: Comment out for demo
    $scope.vehicleIDs = [];

    $scope.getVehicleIDs = function(){
        var url = "http://35.193.191.2:8080/manager/" + $scope.username;
        $.get(url, function(data, status){
            $scope.vehicleIDs = [];
            for(i = 0; i < data.length; i++){
                if(data[i].uid != null){
                    $scope.vehicleIDs.push(data[i].uid);
                }
            }
        });
    }

    $interval(function(){
        $scope.getVehicleIDs();
    }, 500);

    $scope.delete = function(vehicleID){
        var url = "http://35.193.191.2:8080/vehicle/" + vehicleID;
        $http({
            method: 'DELETE',
            url: url,
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        })
        .then(function(response) {
            alert("Deleted " + vehicleID);
        });
    }

    $scope.add = function(){
        var url = "http://35.193.191.2:8080/vehicle/";
        $.post(url, { uid: $scope.addID}, function(data, status){
            console.log(data);
            console.log(status);
            alert("Added " + $scope.addID);
        });
    }
}

angular
  .module('editFleet', ['NavbarService', 'SessionService'])
  .controller('editFleetCtrl', editFleetCtrl);
