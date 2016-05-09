'use strict';

angular.module('myApp.praise', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/praise/:lang', {
            templateUrl: 'praiseView/praise.html',
            controller: 'praiseController'
        });
    }])

    .controller('praiseController', ['$scope', '$routeParams', '$location', '$http', function ($scope, $routeParams, $location, $http) {

        var jsonfile;
        var val = $routeParams.lang;
        if (val === "en") {
            jsonfile = 'praiseView/praises_english.json';
        } else if (val === "tel") {
            jsonfile = 'praiseView/praises_telugu.json';
        }

        $scope.buttonClick = function (path) {
            $location.path(path);
        }

        $http.get(jsonfile)
            .success(function (data) {
                $scope.dataList = data;
            });

        $scope.searchFilter = function (data) {
            var keyword = new RegExp($scope.praiseFilter, 'i');
            return !$scope.praiseFilter || keyword.test(data.Praises);
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


$(document).ready(function () {
    $('#pagination-demo').twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        onPageClick: function (event, page) {
            $('#page-content').text('Page ' + page);
        }
    });
})

