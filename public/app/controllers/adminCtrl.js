var app = angular.module('myApp')

app.controller('adminCtrl', function($scope, adminSrvc, $route){
	adminSrvc.getClients().then(function(response){
				$scope.clients = response;
				console.log(response)
	});

	$scope.currentClient = $route.current.params.name;
	$scope.currentId = $route.current.params.id;


  	
});