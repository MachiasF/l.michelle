var app = angular.module('myApp');

app.controller('adminUsersCtrl', function($scope, adminSrvc, $route, $location){
	$scope.currentClient = $route.current.params.name;
	$scope.currentId = $route.current.params.id;


	$scope.clients = adminSrvc.getClientsAlbums($scope.currentId)
				.then(function(response){
					$scope.clients = response;
					console.log(response);
					$scope.albums = function(){
							var shootsArr = $scope.clients.shoots;
							var thumbnails = [];
							shootsArr.forEach(function(item){
								var obj = {
									id: item._id,
									image: item.photos[0],
									date: item.createdAt
								};
								thumbnails.push(obj)
							})
							if (thumbnails.length == shootsArr.length){
								return thumbnails;
							}
					}();
				});

	$scope.delete = function (ids) {
		var id = ids;
		console.log(id);
		adminSrvc.deleteAlbum(id, $scope.currentId).then(function(response){
			adminSrvc.getClientsAlbums($scope.currentId)
				.then(function(response){
					$scope.clients = response;
					console.log(response);
					$scope.albums = function(){
							var shootsArr = $scope.clients.shoots;
							var thumbnails = [];
							shootsArr.forEach(function(item){
								var obj = {
									id: item._id,
									image: item.photos[0]
								};
								thumbnails.push(obj)
							})
							if (thumbnails.length == shootsArr.length){
								return thumbnails;
							}
					}();
				});
		});
	};
});