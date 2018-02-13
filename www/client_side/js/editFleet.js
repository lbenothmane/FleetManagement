function editFleetCtrl($scope, NavbarService, SessionService){
    NavbarService.initializeNavbar($scope);

    // $scope.TODO = function(){
    //
    // }
}//End controller

angular
  .module('editFleet', ['NavbarService', 'SessionService'])
  .controller('editFleetCtrl', editFleetCtrl);
