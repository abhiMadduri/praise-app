'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.praise',
  'myApp.songs',
  'myApp.quotes'
]).config(['$routeProvider', function($routeProvider) {
   $routeProvider.otherwise({redirectTo: '/praise/en'});
}]);