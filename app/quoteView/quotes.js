'use strict';

angular.module('myApp.quotes', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/quotes/:lang', {
            templateUrl: 'quoteView/quotes.html',
            controller: 'quoteController'
        });
    }])

    .controller('quoteController', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {
         var jsonfile;
        var val = $routeParams.lang;
        if (val === "en") {
            jsonfile = 'quoteView/quotes_english.json';
        } else if (val === "tel") {
            jsonfile = 'quoteView/quotes_telugu.json';
        }

        $scope.buttonClick = function (path) {
            $location.path(path);
        }

        $http.get(jsonfile)
            .success(function (data) {
                $scope.dataList = data;
            });

        $scope.quoteSearchFilter = function (data) {
            var keyword = new RegExp($scope.quoteFilter, 'i');
            return !$scope.quoteFilter || keyword.test(data.Quote);
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
