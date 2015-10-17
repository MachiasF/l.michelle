var app = angular.module('myApp')

app.controller('homeCtrl', function($scope, homeSrvc){
	$scope.background = homeSrvc.randomBackground;
	console.log($scope.background);
	$scope.click = false;
});