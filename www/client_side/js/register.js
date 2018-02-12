function registerCtrl($scope, NavbarService, SessionService){
    SessionService.clearSession();
    NavbarService.initializeNavbar($scope);

    $scope.register = function(){
        var url = "http://35.193.191.2:8080/manager";
        console.log("in function");

		$.post(url,
		 {
		 	username: document.getElementById("username").value,
		 	password: document.getElementById("password").value,
		 	email: document.getElementById("email").value
		 },
		 function(data, status){
		 	console.log(data);
            console.log("test");
	 		//redirect to login
	 		window.location.href = "login.php";
            console.log("test2");
		});
    }
}//End controller

angular
  .module('register', ['NavbarService', 'SessionService'])
  .controller('registerCtrl', registerCtrl);
