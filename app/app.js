var myApp = angular.module('myApp', []);

myApp.controller('mainController', function($scope, $http) {
    
    $scope.dataList = [];
    $scope.nameFilter = null;
    
    $scope.praiseFilter = function(data) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(data.Praises);
    };
    
    $http.get('data.json').success(function(data) {
        $scope.dataList = data;
    });  
    
    //pagination
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.dataList.length/$scope.pageSize);
    }
       
});

myApp.filter('pagination', function() {
   return function(input, start) {
       start = +start;
       return input.slice(start);
   } 
});
