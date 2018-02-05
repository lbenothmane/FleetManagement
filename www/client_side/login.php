<!DOCTYPE html>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<head>
	<title>Login</title>
</head>

<body>
	<?php include("navbar.html");?>
	
	<div class="container">
		<div class="row">
			<input type="text" placeholder="Username" name="username" id="username" required>
		</div>
	    <div class="row">
			<input type="password" placeholder="Password" name="password" id="password" required>
		</div>
	    <button>Login</button>
	</div>
</body>


<script type="text/javascript">
	$("button").click(function(){
		var url = "http://35.193.191.2:8080/manager/login";
		
		$.post(url,
		 {
		 	username: document.getElementById("username").value,
		 	password: document.getElementById("password").value
		 },
		 function(data, status){
		 	console.log(data);
		 	if(data.Validated){
		 		//redirect to main
		 		window.location.href = "fleetmap.php";
		 	}else{
		 		//invalid login
		 		console.log("login fail");
		 	}
		});
	});
</script>