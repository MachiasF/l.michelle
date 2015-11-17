var app = angular.module('myApp')

app.controller('homeCtrl', function($scope, homeSrvc, $location, $anchorScroll){
	$scope.background = homeSrvc.randomBackground;
	$scope.click = false;

	$scope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	}
});