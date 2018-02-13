function loginCtrl($scope, NavbarService, SessionService){
    SessionService.clearSession();
    NavbarService.initializeNavbar($scope);

    $scope.attemptLogin = function(){
        var url = "http://35.193.191.2:8080/manager/login";

        $.post(url,
         {
            username: $scope.username,
            password: $scope.password
         },
         function(data, status){
            console.log(data);
            if(data.Validated){
                SessionService.setCurrentUser($scope.username);
                window.location.href = "fleetmap.php";
            }else{
                console.log("login fail");
            }
        });
    }
}//End controller

angular
  .module('login', ['NavbarService', 'SessionService'])
  .controller('loginCtrl', loginCtrl);
