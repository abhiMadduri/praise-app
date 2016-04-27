var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $http) {
    
    $http.get('data.json').success(function(data) {
        $scope.dataArray = data;
    });  
});
