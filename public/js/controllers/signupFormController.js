'use strict';
//  Initialize App.
var myApp = angular.module('sign-up', ['ngRoute']);

//  Route configuration
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

//  SignupFormCtrl
myApp.controller('SignupFormCtrl', function($scope, $location, $http, $templateCache){
    var method = 'POST';
    var insertUrl = '/insertRecord';
    //  save() function.
    $scope.save = function(form){
        //  Submit form
        $scope.submitted = true;
        //  Validate form and return in case of error.
        if (form.$invalid) {
            $log.error('Invalid Form !!');
            return;
        }

        //  collect form data for HTTP POST request.
        var formData = {
            'firstName' :   this.firstName,
            'lastName'  :   this.lastName,
            'email'     :   this.email
        };
        var userData = 'userInfo='+JSON.stringify(formData);

        //  HTTP POST request.
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
});

//  HomePageCtrl.
myApp.controller('HomePageCtrl', function($scope, $location){
    $scope.goToHomePage = function(){
        $location.path('/');
    }
});
