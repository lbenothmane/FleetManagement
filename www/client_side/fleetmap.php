<!DOCTYPE html>
<html lang="en">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<link href="css/fleetmap.css" rel="stylesheet">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="Chart.js-master/dist/Chart.bundle.js"></script>
	<script type="text/javascript" src="Chart.js-master/samples/utils.js"></script>
	<head>
		<title>My Fleet</title>
		<meta charset="utf-8">
	</head>
	<body>
		<div ng-app="myApp" ng-controller="myCtrl">
			<?php include("navbar.html");?>
			<div class="container-fluid">
				<div class="row">
					<h1>{{username}}'s Fleet</h1>
					<div id="map" ng-model="myMap"></div>
	                <br>
	                <select ng-model="selectedVehicle" ng-change="zoom();updateCharts();">
	                    <option value="0">View All</option>
	                    <option ng-repeat="x in vehicleIDs" value="{{x}}">Vehicle {{x}}</option>
	                </select>
	                <br><br>
	                <button ng-click="refresh()">Refresh Map</button>
				</div>
			</div>
		</div>

		<hr>
		<div class="row">
			<div class="col-md-12">
				<h3>Stats</h3>
			</div>
		</div>
		<div class="row">
			<div class="col-md-6">
				<canvas id="leftCanvas"></canvas>
			</div>
			<div class="col-md-6">
				<canvas id="rightCanvas"></canvas>
			</div>
		</div>
		<script src="js/fleetmap.js"></script>
		<script src="js/services/navbarService.js"></script>
		<script src="js/services/mapService.js"></script>
		<script src="js/services/chartService.js"></script>
		<script src="js/services/sessionService.js"></script>
		<script async
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDIWVftb6HCp43N4pEKs5laMxdHZLepw88">
		</script>
	</body>
</html>
