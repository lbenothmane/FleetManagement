<!DOCTYPE html>
<html lang="en">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
	<head>
		<title>Edit Fleet</title>
		<meta charset="utf-8">
	</head>

	<body>
		<?php include("navbar.html");?>

		<form class="form-horizontal">
			<div class="form-group">
				<label class="control-label col-sm-2" for="email">Vehicle ID:</label>
				<div class="col-sm-10">
					<input type="email" class="form-control" id="email" placeholder="Vehicle ID">
				</div>
			</div>
			<div class="form-group">
				<label class="control-label col-sm-2" for="pwd">Driver:</label>
				<div class="col-sm-10"> 
					<input type="password" class="form-control" id="pwd" placeholder="Driver Name">
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-2 col-sm-10">
					<div class="checkbox">
						<label><input type="checkbox"> Remember me</label>
					</div>
				</div>
			</div>
			<div class="form-group"> 
				<div class="col-sm-offset-2 col-sm-10">
					<button type="submit" class="btn btn-default">Submit</button>
				</div>
			</div>
		</form>
		
	</body>

</html>