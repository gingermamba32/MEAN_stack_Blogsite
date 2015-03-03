'use strict';

/* App Module */

//used for the routing on the client side

// var phonecatApp = angular.module('phonecatApp', [
//   'ngRoute',
//   'phonecatAnimations',

//   'phonecatControllers',
//   'phonecatFilters',
//   'phonecatServices'
// ]);

var routeApp = angular.module('routeApp', [
  'ngRoute',
  'formApp'
  ]);

routeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController as logCtrl'
      }).
      when('/register', {
        templateUrl: 'partials/register.html',
        controller: 'RegistrationController as regisCtrl'
      }).
      when('/posts', {
        templateUrl: 'partials/posts.html',
        controller: 'PostController as postCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);



