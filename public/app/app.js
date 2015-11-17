
var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider) {
	$routeProvider
				.when('/', {
					templateUrl: 'app/html/home.html',
					controller: 'homeCtrl'
				})
				//---admin pages---
				.when('/admin', {
					templateUrl: 'app/html/admin.html',
					controller: 'adminCtrl',
					resolve: {
						user: isAuthed
					}
				})
				.when('/admin/users/:name/:id', {
					templateUrl: 'app/html/adminUsers.html',
					controller: 'adminUsersCtrl'
				})
				.when('/admin/users/:name/:id/newshoot', {
					templateUrl: 'app/html/adminShoot.html',
					controller: 'adminShootCtrl',

				})

				//------users pages----
				
				.when('/users', {
					templateUrl: 'app/html/users.html',
					controller: 'usersCtrl',
					resolve: {
						user: isAuthed,
						user: function(userSrvc) {
							return userSrvc.getUser();
						}
					} 
				})
				.when('/users/album/:id',{
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
			if (currentUser.admin === true) {
				$location.path('/admin');
				return;
			} 
			if (currentUser.facebookId) {
				$location.path('/users');
				return;
			}
			if (currentUser.admin === undefined){
				$location.path('/');
				return;
			}
		})
	};

});
app.run(function($rootScope, $location, $anchorScroll, $route) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    if($location.hash()) $anchorScroll();  
  });
});
