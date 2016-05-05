'use strict';

angular.module('myApp.song', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/song', {
    templateUrl: 'songView/song.html',
    controller: 'songController'
  });
}])

.controller('songController', [function() {

}]);