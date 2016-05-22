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
                
        if (locale === "eng") {
            $scope.songView = "English";
            jsonfile = 'songView/songs_english.json';
        } else if (locale === "tel" || locale == "en") {
            $scope.songView = "Telugu";
            jsonfile = 'songView/songs_telugu.json';
        } else if (locale === "ss") {
            $scope.songView = "Sunday School"
            jsonfile = 'songView/songs_sundayschool.json';
        }
        
       $http.get(jsonfile)
            .success(function (data) {
                $scope.dataList = data;
                if($routeParams.id === undefined) {
                    return;
                }
                var songObject = $scope.dataList.songs[$routeParams.id];
                if($routeParams.lang === "tel") {
                  // $scope.selectedSong = str.replace(new RegExp('\n','g'), '<br />')
                  $scope.selectedSong =  songObject["lyrics_tel"];
                } else if($routeParams.lang === "en" || $routeParams.lang === "eng") {
                   $scope.selectedSong = songObject["lyrics_en"];
                }
            }); 
 
        $scope.buttonClick = function (path) {
            var str = $location.url().split("/");
            var lang = str[str.length - 2];
            var id = str[str.length-1];
           
            $location.path(path + "/" +id);
        }
        
        $scope.linkClicked = function (path) {
           var url = $location.url() + "/" + path;
            $location.path(url);
        }

  
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
    )
    
    .filter('newlines', function() {
        return function(text) {
            return text.split(/\n/g);
        };
     });