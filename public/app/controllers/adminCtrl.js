var app = angular.module('myApp')

app.controller('adminCtrl', function($scope, adminSrvc, $route){
	$scope.users = adminSrvc.getUsers()
			.then(function(response){
				$scope.users = response;

			});
	$scope.currentUser = $route.current.params.id;
});