'use strict';

angular.module('myApp.songs', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/songs/:lang', {
    templateUrl: 'songView/songs.html',
    controller: 'songController'
  }).
  when('/songs/:lang/:id', {
    templateUrl: 'songView/song.html',
    controller: 'songController'
  });
}])

.controller('songController', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {

        var jsonfile;
        var locale = $routeParams.lang;
        $scope.songId = $routeParams.id;
        if($routeParams.id != null) {
           // console("songID : " + songId);
        }
        
        
        if (locale === "en") {
            $scope.songView = "English";
            jsonfile = 'songView/songs_english.json';
        } else if (locale === "tel") {
            $scope.songView = "Telugu"
            jsonfile = 'songView/songs_telugu.json';
        } else if (locale === "ss") {
            $scope.songView = "Sunday School"
            jsonfile = 'songView/songs_sundayschool.json';
        }

        $scope.buttonClick = function (path) {
            console.log("Btn click= " +path);
            $location.path(path);
        }
        
        $scope.linkClicked = function (path) {
            
            var url = "/songs/tel/" + path;
            console.log("link clicked.. " + url);
            $location.path(url);
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