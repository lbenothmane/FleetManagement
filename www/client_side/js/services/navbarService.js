angular.module('NavbarService', ['SessionService'])
.service('NavbarService',function(SessionService) {
    this.initializeNavbar = function ($scope) {
        if(SessionService.getCurrentUser() == null){
            $scope.showHome = false;
            $scope.showEditFleet = false;
            $scope.showEditView = false;
            $scope.showLogin = true;
            $scope.showRegister = true;
            $scope.showLogout = false;
        }else{
            $scope.showHome = true;
            $scope.showEditFleet = true;
            $scope.showEditView = true;
            $scope.showLogin = false;
            $scope.showRegister = false;
            $scope.showLogout = true;
        }
    };

});
