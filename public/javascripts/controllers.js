'use strict';

/* Controllers */
var sessionLength = 300000;

var formApp = angular.module('formApp', ['ngCookies']);

formApp.controller('RegistrationController', ['$scope', '$http', '$location', function($scope, $http, $location) {
	$scope.message = 'Please Register';
	$scope.username = '';
	$scope.password = '';
	$scope.email = '';
	// Simple POST request example (passing data) :
	this.register = function () {
		if ($scope.username && $scope.password && $scope.email) {
			$http.post('/api/register', {username: $scope.username, password: $scope.password, email: $scope.email}).
				success(function(data, status, headers, config) {
					if (data.added) {
						$scope.message = 'Registration successful';
						$scope.username = '';
						$scope.password = '';
						$scope.email = '';
						$location.path('/');
					} else {
						$scope.message = 'Registration unsuccessful, username already exists.';
						$scope.username = '';
						$scope.password = '';
						$scope.email = '';
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
				});
		} else {
			$scope.message = 'Registration unsuccessful.  Please complete all fields.';
		}
	}

	this.direct = function (){
		$location.path('/');
	}
	
}]);

formApp.controller('LoginController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies) {
	if (Date.now() - $cookies.timeStamp < sessionLength) {
		$location.path('/posts');
	} else {
		$cookies.timeStamp = 0;
		$cookies.user = null;
		$scope.message = 'Please Sign In';
		$scope.username = '';
		$scope.password = '';
		// Simple POST request example (passing data) :
		this.login = function () {
			$http.post('/api/login', {username: $scope.username, password: $scope.password}).
				success(function(data, status, headers, config) {
					if (data.loggedIn) {
						$cookies.timeStamp = Date.now();
						$cookies.user = $scope.username;
						$location.path('/posts');
					} else {
						$scope.message = 'Login unsuccessful.  Username and password pair not found.';
						$scope.password = '';
					}
				}).
				error(function(data, status, headers, config) {
					console.log(data);
					$scope.message = 'Login unsuccessful.  Username and password pair not found.  Please register.';
					$scope.password = '';
				});
		}

		this.direct = function (){
			$location.path('/register');
		}
	}
}]);

formApp.controller('PostController', ['$scope', '$http', '$location', '$cookies', function($scope, $http, $location, $cookies){
	function populatePage () {
		if (Date.now() - $cookies.timeStamp < sessionLength) {
			$cookies.timeStamp = Date.now();
			$scope.posts = [];
			$scope.text = '';
			$http.get('/api/getPosts').
			success(function(data, status, headers, config) {
				data.forEach(function(elem) {
					$scope.posts.push(elem);

					// console.log('author: ' + elem.author);
					// console.log('text: ' + elem.text);
				});
			}).
			error(function(data, status, headers, config){
				console.log(data);
			});
		} else {
			$cookies.user = null;
			$location.path('/');
		}
	}
	
	var user = $cookies.user;
	populatePage();

		//****************new***************//
	this.submit = function() {
		$http.post('/api/makePost', {author: user, text: $scope.text}).
		success(function(data, status, headers, config){
			populatePage();
		}).
		error(function(data, status, headers, config){
			console.log(data);
		});
	}

	this.delete = function(obj) {
		$http.post('/api/delete', {id: 'ObjectId("54f0feaf3d0a17730bd8375a")'}).
		success(function(data, staus, headers, config) {
			console.log(data);
			console.log(status);
		});
	}

	this.logout = function() {
		$cookies.timeStamp = 0;
		$cookies.user = null;
		populatePage();
	}
}]);




