'use strict';
var myApp = angular.module('sign-up', ['ngRoute']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'templates/main.html',
            controller: 'SignupFormCtrl'
        })
        .when('/success',{
            templateUrl: 'templates/success.html',
            controller: 'HomePageCtrl'
        })
        .when('/entryexists',{
            templateUrl: 'templates/entryexists.html',
            controller: 'HomePageCtrl'
        })
        .when('/error', {
            templateUrl: 'templates/notsaved.html',
            controller: 'HomePageCtrl'
        })
        .otherwise({ redirectTo: '/' });;

}]);

function SignupFormCtrl($scope, $location, $http, $templateCache){
    var method = 'POST';
    var insertUrl = '/insertRecord';
    $scope.save = function(form){
        $scope.submitted = true;
        if (form.$invalid) {
            $log.error('Invalid Form !!');
            return;
        }
        var formData = {
            'firstName' :   this.firstName,
            'lastName'  :   this.lastName,
            'email'     :   this.email
        };

        var userData = 'userInfo='+JSON.stringify(formData);

        $http({
            method  :   method,
            url     :   insertUrl,
            data    :   userData,
            headers :   {'Content-Type':'application/x-www-form-urlencoded'},
            cache   :   $templateCache
        }).
        success(function(response){
            if(response === 'Record Exists'){
                $location.path('/entryexists');
            }else {
                $location.path('/success');
            }
        }).
        error(function(response){
            $location.path('/error');
        });
        return false;
    };
}

myApp.controller('HomePageCtrl', function($scope, $location){
    $scope.goToHomePage = function(){
        $location.path('/');
    }
});
