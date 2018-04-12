function editFleetCtrl($scope, $http, $interval, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);
    $scope.username = SessionService.getCurrentUser();
    $scope.vehicleIDs = [];

    $scope.getVehicleIDs = function(){
        var url = "http://35.193.191.2:8080/manager/" + $scope.username;
        $.get(url, function(data, status){
            $scope.vehicleIDs = [];
            for(i = 0; i < data.length; i++){
                if(data[i].vid != null){
                    $scope.vehicleIDs.push(data[i].vid);
                }
            }
        });
    }

    $interval(function(){
        $scope.getVehicleIDs();
    }, 500);

    $scope.delete = function(vehicleID){
        var url = "http://35.193.191.2:8080/vehicle/" + vehicleID; //TODO
        $.ajax({
            type: 'DELETE',
            url: url
        }).done(function() {
             alert("Deleted " + vehicleID);
            });
    }

    $scope.add = function(){
        var url = "http://35.193.191.2:8080/manager/" + $scope.username;
        $.ajax({
            type: 'PUT',
            url: url,
            data: { vid: $scope.addID, bitrate: $scope.addBitrate, gasTankSize: $scope.addGasTankSize }
        }).done(function() {
             alert("Added " + $scope.addID);
            });
    }
}

angular
  .module('editFleet', ['NavbarService', 'SessionService'])
  .controller('editFleetCtrl', editFleetCtrl);
