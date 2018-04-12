function editViewCtrl($scope, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);

    $scope.fleetOptions = ['Remaining Fuel', 'Gas Consumption'];
    //$scope.fleetSelection = JSON.parse(localStorage.getItem("fleetCharts"));
    var url = "http://35.193.191.2:8080/manager/chart/" + $scope.username;
    $.get(url, function(data, status){
      console.log(data);
    });

    $scope.vehicleOptions = ['Current Speed', 'Engine Temperature'];
    // $scope.vehicleSelection = JSON.parse(localStorage.getItem("vehicleCharts"));
    if($scope.vehicleSelection == null){
      $scope.vehicleSelection = [];
    }

    $scope.fleetToggle = function(fleetOption) {
       var idx = $scope.fleetSelection.indexOf(fleetOption);

       if(idx > -1){
         $scope.fleetSelection.splice(idx, 1);
       }else{
         $scope.fleetSelection.push(fleetOption);
       }

       console.log($scope.fleetSelection);

       // localStorage.setItem("fleetCharts", JSON.stringify($scope.fleetSelection));
    }

    $scope.vehicleToggle = function(vehicleOption) {
       var idx = $scope.vehicleSelection.indexOf(vehicleOption);

       if(idx > -1){
         $scope.vehicleSelection.splice(idx, 1);
       }else{
         $scope.vehicleSelection.push(vehicleOption);
       }

       console.log($scope.vehicleSelection);

       // localStorage.setItem("vehicleCharts", JSON.stringify($scope.vehicleSelection));
    }

    $scope.saveChanges = function() { // TODO: POST updates to settings
      var url = "http://35.193.191.2:8080/manager/charts/" + $scope.username;
      var charts = {};
      charts.FleetCharts = {};
      charts.FleetCharts.RemainingFuel = $scope.fleetSelection.indexOf("RemainingFuel");
      charts.FleetCharts.GasConsumption = $scope.fleetSelection.indexOf("GasConsumption");
      $.ajax({
          type: 'PUT',
          url: url,
          charts: charts
        }).done(function() {
          console.log(data);
        });
    }
}//End controller

angular
  .module('editView', ['NavbarService', 'SessionService'])
  .controller('editViewCtrl', editViewCtrl);
