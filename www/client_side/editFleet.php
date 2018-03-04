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
					<label class="control-label col-sm-2" for="email">Vehicle ID:</label>
					<div class="col-sm-10">
						<input type="email" class="form-control" id="email" placeholder="Vehicle ID">
					</div>
				</div>
				<!-- <div class="form-group">
					<label class="control-label col-sm-2" for="pwd">Driver:</label>
					<div class="col-sm-10">
						<input type="password" class="form-control" id="pwd" placeholder="Driver Name">
					</div>
				</div> -->
				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						<button type="submit" class="btn btn-default">Add Vehicle to My Fleet</button>
					</div>
				</div>
			</form>
			<hr>
			<h2>Delete Vehicle(s)</h2>
			<table>
	            <tr ng-repeat="x in vehicleIDs">
	              <td>{{x}}</td>
			  	  <td><button ng-click="delete(x)">Delete</button></td>
	            </tr>
	        </table>
		</div>
	</body>
	<script src="js/services/navbarService.js"></script>
	<script src="js/services/sessionService.js"></script>
	<script src="js/editFleet.js"></script>
</html>
