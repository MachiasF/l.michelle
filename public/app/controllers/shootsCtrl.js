var app = angular.module('myApp')

app.controller('shootsCtrl', function($scope, $route, userSrvc){
	var albumId = $route.current.params.id;
	console.log(albumId);
	$scope.photos = userSrvc.getCurrentAlbum(albumId).then(function(response){
		$scope.photos = response.photos;
		console.log($scope.photos);
	})
});