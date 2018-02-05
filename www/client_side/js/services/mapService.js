angular.module('MapService',[])
 .service('MapService',function(){

     this.createMap = function ($scope) {
         var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[0];
         $.get(url, function(data, status){
             var centerCoords = {lat: data.mrLat, lng: data.mrLong};
             var map = new google.maps.Map(document.getElementById('map'), {
               zoom: 8,
               center: centerCoords
             });
             $scope.map = map;
             plotMarkers($scope);
         });
     };

     var plotMarkers = function($scope){
         $scope.markers = [];
         for(i = 0; i<$scope.vehicleIDs.length; i++){
             var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[i];
             $.get(url, function(data, status){
                 if (data == null){
                     return;
                 }
                 var coords = {lat: data.mrLat, lng: data.mrLong};
                 var marker = new google.maps.Marker({
                   position: coords,
                   label: ""+data.uid,
                   map: $scope.map
                 });
                 $scope.markers.push(marker);
             });
         }
     }

      this.updateMarkers = function ($scope) {
         var i;
         if($scope.vehicleIDs != undefined){
             for(i = 0; i < $scope.vehicleIDs.length; i++){
                 requestCoordsAndPlaceMarker($scope, i);
             }
         }
     }

     var requestCoordsAndPlaceMarker = function($scope, index){
         var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[index];
         $.get(url, function(data, status){
             if(data == null){
                 return;
             }
             var coords = {lat: data.mrLat, lng: data.mrLong};
             // if ($scope.markers[index] == null)
             //     console.log($scope.markers)
             if($scope.markers != undefined && $scope.markers[index] != undefined){
                 $scope.markers[index].setPosition(coords);
             }
         });
     }

     this.zoom = function($scope) {
         if($scope.selectedVehicle == 0){ //View all
             var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[0];
             $.get(url, function(data, status){
                 var coords = {lat: data.mrLat, lng: data.mrLong};
                 $scope.map.setCenter(coords);
                 $scope.map.setZoom(8);
             });
         }else{
             var url = "http://35.193.191.2:8080/vehicle/" + $scope.selectedVehicle;
             $.get(url, function(data, status){
                 var coords = {lat: data.mrLat, lng: data.mrLong};
                 $scope.map.setCenter(coords);
                 $scope.map.setZoom(15);
             });
         }
     }
 });
