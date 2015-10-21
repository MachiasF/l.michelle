var app = angular.module('myApp')

app.controller('adminCtrl', function($scope, adminSrvc, $route, Upload){
	$scope.users = adminSrvc.getUsers()
			.then(function(response){
				$scope.users = response;

			});
	$scope.currentUser = $route.current.params.name;
	$scope.currentId = $route.current.params.id;

  
});