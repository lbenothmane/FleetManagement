function navbarCtrl($scope, SessionService){
    if(SessionService.getCurrentUser() == null){
        $scope.showHome = false;
        $scope.showEditFleet = false;
        $scope.showEditView = false;
        $scope.showLogin = true;
        $scope.showRegister = true;
    }else{
        $scope.showHome = true;
        $scope.showEditFleet = true;
        $scope.showEditView = true;
        $scope.showLogin = false;
        $scope.showRegister = false;
    }
}//End controller

angular
  .module('navbar', ['SessionService'])
  .controller('navbarCtrl', navbarCtrl);
