
var app = angular.module('myApp', ['ngRoute', 'flow']);

app.config(function($routeProvider) {
	$routeProvider
				.when('/', {
					templateUrl: 'app/html/home.html',
					controller: 'homeCtrl'
				})
				.when('/admin', {
					templateUrl: 'app/html/admin.html',
					controller: 'adminCtrl',
					resolve: {
						user: isAuthed
					}
				})
				.when('/admin/users/:id', {
					templateUrl: 'app/html/adminUsers.html',
					controller: 'adminCtrl'
				})
				.when('/admin/users/:id/newshoot', {
					templateUrl: 'app/html/adminShoot.html',
					controller: 'adminShootCtrl',

				})


				
				.when('/users', {
					templateUrl: 'app/html/users.html',
					controller: 'usersCtrl',
					resolve: {
						user: function(userSrvc) {
							return userSrvc.getUser();
						}
					} 
				})
				.when('/users/shoots/:id',{
					templateUrl: 'app/html/shoots.html',
					controller: 'shootsCtrl'
				})
				//.otherwise('/')



	function isAuthed($http, $location) {
		$http({
			method: 'GET',
			url: '/user'
		}).then(function(response) {
			var currentUser = response.data;
			if (currentUser.admin) {
				$location.path('/admin');
				return;
			} else {
				return currentUser
			}
		})
	};

});
