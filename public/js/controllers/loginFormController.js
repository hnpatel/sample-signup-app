'use strict';
var myApp = angular.module('records', ['ngRoute']);

myApp.controller('LoginFormController', function($scope, $location, $http, $templateCache){
    $scope.login = function(form){
        $scope.submitted = true;
        if(form.$invalid){
            return;
        }
        console.log("Inside LoginFormController");
        $http({
            method  :   'POST',
            url     :   '/user/login',
            data    :   '{email:'+this.email+','+'password:'+this.password+'}',
            headers :   {'Content-Type':'application/x-www-form-urlencoded'},
            cache   :   $templateCache
        }).
        error(function(res){
            console.log("Error :: ");
        }).
        success(function(res){
            console.log("Success : Inside loginFormController");
            $location.path('/verify-records');
        })

    };
});