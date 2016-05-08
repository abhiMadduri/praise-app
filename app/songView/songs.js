'use strict';

angular.module('myApp.songs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/songs/:lang', {
    templateUrl: 'songView/songs.html',
    controller: 'songController'
  });
}])

.controller('songController', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {

        var jsonfile;
        var val = $routeParams.lang;
        if (val === "en") {
            $scope.songView = "English";
            jsonfile = 'songView/songs_english.json';
        } else if (val === "tel") {
            $scope.songView = "Telugu"
            jsonfile = 'songView/songs_telugu.json';
        } else if (val === "ss") {
            $scope.songView = "Sunday School"
            jsonfile = 'songView/songs_sundayschool.json';
        }

        $scope.buttonClick = function (path) {
            $location.path(path);
        }
        
        $scope.linkClicked = function (path) {
            console.log(path);
        }

        $http.get(jsonfile)
            .success(function (data) {
                $scope.dataList = data;
            });

        $scope.songSearchFilter = function (data) {
            var keyword = new RegExp($scope.songsFilter, 'i');
            return !$scope.songsFilter || keyword.test(data.Praises);
        };

        //pagination
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.numberOfPages = function () {
            if ($scope.dataList == undefined) {
                return 0;
            }
            return Math.ceil($scope.dataList.length / $scope.pageSize);
        }

    }])

    .filter('pagination', [function () {
        return function (input, start) {
            if (input == null) { return ""; }
            start = +start;
            return input.slice(start);
        }
    }]
    );