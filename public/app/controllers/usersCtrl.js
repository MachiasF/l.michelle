var app = angular.module('myApp')

app.controller('usersCtrl', function($scope, userSrvc, $route, user){
	$scope.user = user;


	$scope.userInfo = userSrvc.getUserAlbums($scope.user._id)
			.then(function(response){
				$scope.userInfo = response.shoots;

				
			});



	$scope.submit = function() {
		$scope.address = $scope.street + ' ' + $scope.city + ' ' + $scope.state + ' ' + $scope.zip
		var profile = {
			email: $scope.email,
			phone: $scope.phone,
			address: $scope.address
		};
		userSrvc.updateUser(profile, user._id)
				.then(function(response){

		})
	}
});