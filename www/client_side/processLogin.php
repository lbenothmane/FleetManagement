<?php
	$username = $_POST["username"];
	$password = $_POST["password"];

	$actual_link = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
	$actual_link = substr($actual_link, 0, -16);

	if($username == "root"){
		header("Location: " . $actual_link . "fleetmap.php");
		exit();
	}else{
		header("Location: " . $actual_link . "login.php");
		exit();
	}
?>