var app = angular.module('myApp')

app.controller('usersCtrl', function($scope, userSrvc, $route, user){
	// $scope.user = userSrvc.getUser()
	// 		.then(function(response){
	// 			$scope.user = response;
	// 			console.log($scope.user)
	// 		});
	$scope.user = user;
	console.log(user);
});