<!DOCTYPE html>
<html lang="en">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

	<head>
		<title>Edit Fleet</title>
		<meta charset="utf-8">
	</head>

	<body>
		<div ng-app="editFleet" ng-controller="editFleetCtrl">
			<?php include("navbar.html");?>
			<h2>Add New Vehicle</h2>
			<form class="form-horizontal">
				<div class="form-group">
					<label class="control-label col-sm-2">New Vehicle Information:</label>
					<div class="col-sm-2">
						<input type="text" class="form-control" ng-model="addID" placeholder="Vehicle ID">
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" ng-model="addBitrate" placeholder="Bitrate">
					</div>
					<div class="col-sm-2">
						<input type="text" class="form-control" ng-model="addGasTankSize" placeholder="Gas Tank Size">
					</div>
				</div>
				<!-- <div class="form-group">
					<label class="control-label col-sm-2" for="pwd">Driver:</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="pwd" placeholder="Driver Name">
					</div>
				</div> -->
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-2">
						<button type="submit" class="btn btn-default" ng-click="add()">Add Vehicle to My Fleet</button>
					</div>
				</div>
			</form>
			<hr>
			<h2>Delete Vehicle(s)</h2>
			<table>
	            <tr ng-repeat="x in vehicleIDs">
			  	  <td><button class="btn btn-default" ng-click="delete(x)">Delete Vehicle {{x}}</button></td>
	            </tr>
	        </table>
		</div>
	</body>
	<script src="js/services/navbarService.js"></script>
	<script src="js/services/sessionService.js"></script>
	<script src="js/editFleet.js"></script>
</html>
