<!DOCTYPE html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<head>
	<title>Edit View</title>
</head>

<body>
	<div ng-app="editView" ng-controller="editViewCtrl">
		<?php include("navbar.html");?>
        <h1>Manage Statistics on Your Home Page</h1>
        <h3>Fleet Statistics</h3>
        <table border="1">
            <tr ng-repeat="x in fleetOptions">
              <td><input type="checkbox" ng-checked="fleetSelection.indexOf(x) > -1" ng-click="fleetToggle(x)">{{x}}</td>
            </tr>
        </table>
        <hr>
        <h3>Individual Vehicle Statistics</h3>
        <table border="1">
            <tr ng-repeat="x in vehicleOptions">
                <td><input type="checkbox" ng-checked="vehicleSelection.indexOf(x) > -1" ng-click="vehicleToggle(x)">{{x}}</td>
            </tr>
        </table>
        <br><br>
        <button ng-click=saveChanges()>Save All Changes</button>
	</div>
</body>

<script src="js/services/navbarService.js"></script>
<script src="js/services/sessionService.js"></script>
<script src="js/editView.js"></script>
