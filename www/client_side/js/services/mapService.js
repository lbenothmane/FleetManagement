angular.module('MapService',[])
 .service('MapService',function(){

     this.createMap = function ($scope) {
         if($scope.vehicleIDs == null){
             return;
         }
         var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[0];
         $.get(url, function(data, status){ // GET to set center of map
             if(data == null){
                 console.log("Vehicle " + $scope.vehicleIDs[0] + " has no data.");
                 return;
             }
             var centerCoords = {lat: data.mrLat, lng: data.mrLong};
             var map = new google.maps.Map(document.getElementById('map'), {
               zoom: 10,
               center: centerCoords
             });
             $scope.map = map;
             plotMarkers($scope);
         });
     };

     var plotMarkers = function($scope){
         $scope.markers = new Map();
         $scope.vehicleData = new Map();
         for(i = 0; i < $scope.vehicleIDs.length; i++){
             var url = "http://35.193.191.2:8080/vehicle/" + $scope.vehicleIDs[i];
             $.get(url, function(data, status){ // GET to initialize map markers
                 if (data == null){
                     return;
                 }
                 $scope.vehicleData.set(data.vid, data);
                 var coords = {lat: data.mrLat, lng: data.mrLong};
                 var marker = new google.maps.Marker({
                   position: coords,
                   label: ""+data.vid,
                   map: $scope.map
                 });
                 $scope.markers.set(data.vid, marker);
             });
         }
     }

      this.updateMarkers = function ($scope) {
         var i;
         if($scope.vehicleIDs != undefined && $scope.vehicleData != undefined){
             for(i = 0; i < $scope.vehicleIDs.length; i++){
                 placeMarker($scope, $scope.vehicleIDs[i]);
             }
         }
     }

     var placeMarker = function($scope, index){
         var data = $scope.vehicleData.get(index);
         if(data == null){
             return;
         }
         var coords = {lat: data.mrLat, lng: data.mrLong};
         if($scope.markers != undefined && $scope.markers.get(index) != undefined){
             $scope.markers.get(index).setPosition(coords);
         }
     }

     this.zoom = function($scope) {
         if($scope.selectedVehicle == 0 && $scope.vehicleData != undefined){ //View all
             var data = $scope.vehicleData.get($scope.vehicleIDs[0]);
             var coords = {lat: data.mrLat, lng: data.mrLong};
             $scope.map.setCenter(coords);
             $scope.map.setZoom(10);
         }else{
             var id = Number($scope.selectedVehicle);
             var data = $scope.vehicleData.get(id);
             var coords = {lat: data.mrLat, lng: data.mrLong};
             $scope.map.setCenter(coords);
             $scope.map.setZoom(15);
         }
     }
 });
