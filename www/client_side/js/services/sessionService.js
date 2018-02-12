angular.module('SessionService',[])
.service('SessionService',function() {
    this.clearSession = function () {
        window.sessionStorage.removeItem('username');
    };

    this.getCurrentUser = function () {
        var currentUser = window.sessionStorage.getItem('username');
        return currentUser;
    };

    this.setCurrentUser = function (user) {
        window.sessionStorage.setItem('username', user);
    };

});
