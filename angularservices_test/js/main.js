function myCtrl($scope, $interval, TestService){
    TestService.change($scope);
}

angular
  .module('myApp', ['TestService'])
  .controller('myCtrl', myCtrl);
