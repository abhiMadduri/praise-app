'use strict';

angular.module('myApp.praise', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/praise/:lang', {
    templateUrl: 'praiseView/praise.html',
    controller: 'praiseController'
  });
}])

.controller('praiseController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    
    var jsonfile;
   
    if($routeParams.lang === "en") {
        jsonfile = 'praiseView/praises_english.json';
    } else if($routeParams.lang === "tel") {
        jsonfile = 'praiseView/praises_telugu.json';
    }
    
    $http.get(jsonfile)
    .success(function(data) {
        $scope.dataList = data;
    });
    
    $scope.nameFilter = null;
    
    $scope.praiseFilter = function(data) {
        var keyword = new RegExp($scope.nameFilter, 'i');
        return !$scope.nameFilter || keyword.test(data.Praises);
    };
    
    //pagination
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.numberOfPages = function() {
        return Math.ceil($scope.dataList.length/$scope.pageSize);
    }
       
}])

.filter('pagination', [function() {
   return function(input, start) {
       start = +start;
       return input.slice(start);
   } 
}]);
