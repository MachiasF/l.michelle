var app = angular.module('myApp')

app.controller('usersCtrl', function($scope, userSrvc, $route, user){

	$scope.currentUser = user;
	$scope.shoots = $scope.currentUser.shoots;
	console.log($scope.shoots);
});