angular.module('TestService',[])
.service('TestService',function(){

    this.change = function ($scope) {
        $scope.testing = "inside an extracted service!";
    };

});
