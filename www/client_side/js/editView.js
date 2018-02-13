function editViewCtrl($scope, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);

    $scope.fleetOptions = ['Remaining Fuel', 'Gas Consumption'];
    $scope.fleetSelection = ['Remaining Fuel', 'Gas Consumption']; // TODO: Load current settings

    $scope.vehicleOptions = ['Current Speed'];
    $scope.vehicleSelection = ['Current Speed']; // TODO: Load current settings

    $scope.fleetToggle = function(fleetOption) {
       var idx = $scope.fleetSelection.indexOf(fleetOption);

       if(idx > -1){
         $scope.fleetSelection.splice(idx, 1);
       }else{
         $scope.fleetSelection.push(fleetOption);
       }

       console.log($scope.fleetSelection);
    }

    $scope.vehicleToggle = function(vehicleOption) {
       var idx = $scope.vehicleSelection.indexOf(vehicleOption);

       if(idx > -1){
         $scope.vehicleSelection.splice(idx, 1);
       }else{
         $scope.vehicleSelection.push(vehicleOption);
       }

       console.log($scope.vehicleSelection);
    }

    $scope.saveChanges = function() { // TODO: POST updates to settings

    }
}//End controller

angular
  .module('editView', ['NavbarService', 'SessionService'])
  .controller('editViewCtrl', editViewCtrl);
