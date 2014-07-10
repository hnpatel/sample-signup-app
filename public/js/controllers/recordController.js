'use strict';

var recordApp = angular.module('records', []);

recordApp.controller('RecordCtrl', function($scope){
    $scope.records = records;
});