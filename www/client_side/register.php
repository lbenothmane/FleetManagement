<!DOCTYPE html>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<head>
	<title>Register</title>
</head>

<body>
	<div ng-app="register" ng-controller="registerCtrl">
		<?php include("navbar.html");?>
		<div class="container">
			<div class="row">
				<input type="text" placeholder="Email" name="email" id="email" required>
			</div>
			<div class="row">
				<input type="text" placeholder="Username" name="username" id="username" required>
			</div>
		    <div class="row">
				<input type="password" placeholder="Password" name="password" id="password" required>
			</div>
		    <button ng-click=register()>Register</button>
		</div>
	</div>
</body>

<script src="js/services/navbarService.js"></script>
<script src="js/services/sessionService.js"></script>
<script src="js/register.js"></script>
