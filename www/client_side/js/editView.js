function editViewCtrl($scope, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);

    var url = "http://35.193.191.2:8080/manager/chart/" + SessionService.getCurrentUser();
    $.get(url, function(data, status){
      console.log(data);
    });


    $scope.fleetOptions = ['Remaining Fuel', 'Gas Consumption'];
    // $scope.fleetSelection = ['Remaining Fuel', 'Gas Consumption'];
    if(localStorage.getItem("fleetCharts")){
      $scope.fleetSelection = JSON.parse(localStorage.getItem("fleetCharts"));
    }
    
    
    $scope.vehicleOptions = ['Current Speed', 'Engine Temperature', 'Engine Load'];
    // $scope.vehicleSelection = ['Current Speed', 'Engine Temperature', 'Engine Load'];
    if(localStorage.getItem("vehicleCharts")){
      $scope.vehicleSelection = JSON.parse(localStorage.getItem("vehicleCharts"));
    }

    if($scope.fleetSelection == null){
      $scope.fleetSelection = ['Remaining Fuel', 'Gas Consumption'];
    }
    if($scope.vehicleSelection == null){
      $scope.vehicleSelection = ['Current Speed', 'Engine Temperature', 'Engine Load'];
    }

    $scope.fleetToggle = function(fleetOption) {
       var idx = $scope.fleetSelection.indexOf(fleetOption);

       if(idx > -1){
         $scope.fleetSelection.splice(idx, 1);
       }else{
         $scope.fleetSelection.push(fleetOption);
       }

       console.log($scope.fleetSelection);

       localStorage.setItem("fleetCharts", JSON.stringify($scope.fleetSelection));
    }

    $scope.vehicleToggle = function(vehicleOption) {
       var idx = $scope.vehicleSelection.indexOf(vehicleOption);

       if(idx > -1){
         $scope.vehicleSelection.splice(idx, 1);
       }else{
         $scope.vehicleSelection.push(vehicleOption);
       }

       console.log($scope.vehicleSelection);

       localStorage.setItem("vehicleCharts", JSON.stringify($scope.vehicleSelection));
    }

    $scope.saveChanges = function() { // TODO: POST updates to settings
      var url = "http://35.193.191.2:8080/manager/chart/" + SessionService.getCurrentUser();
      var jsonString = $scope.buildJSON();
      console.log(jsonString);

      $.ajax({
          type: 'PUT',
          url: url,
          data: jsonString
        }).done(function(data) {
          console.log(data);
        });
      
    }

    $scope.buildJSON = function(){
      var jsonString = "{";
      $scope.fleetOptions.forEach(function(element){
        jsonString += "'name': '" + element + "',";
        jsonString += "'active': " + (($scope.fleetSelection.indexOf(element) != -1) ? "true" : "false") + ",";;
      });

      $scope.vehicleOptions.forEach(function(element){
        jsonString += "'name': '" + element + "',";
        jsonString += "'active': " + (($scope.vehicleSelection.indexOf(element) != -1) ? "true" : "false") + ",";;
      });
      jsonString = jsonString.slice(0,jsonString.length-1);
      jsonString += "}";

      return jsonString;
    }
}//End controller

angular
  .module('editView', ['NavbarService', 'SessionService'])
  .controller('editViewCtrl', editViewCtrl);
