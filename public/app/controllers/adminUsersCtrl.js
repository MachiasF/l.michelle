var app = angular.module('myApp');

app.controller('adminUsersCtrl', function($scope, adminSrvc, $route, $location){
	$scope.currentClient = $route.current.params.name;
	$scope.currentId = $route.current.params.id;


	var clients = adminSrvc.getClientsAlbums($scope.currentId)
				.then(function(response){
					$scope.clients = response;
					$scope.albums = function(){
							var shootsArr = $scope.clients.shoots;
							var thumbnails = [];
							shootsArr.forEach(function(item){
								var obj = {
									id: item._id,
									image: item.photos[0],
									images: item.photos,
									date: item.createdAt,
									subject: item.subject
								};
								thumbnails.push(obj)
							})
							if (thumbnails.length == shootsArr.length){
								return thumbnails;
							}
					}();
				});

	$scope.delete = function (ids, images) {
		var id = ids;
		var photos = [];
		for (var i = 0; i < images.length; i++){
			var newImageName = images[i].substr(58)
			photos.push(newImageName);
		}
		adminSrvc.deleteAlbum(id, photos, $scope.currentId).then(function(response){
			adminSrvc.getClientsAlbums($scope.currentId)
				.then(function(response){
					$scope.clients = response;
					$scope.albums = function(){
							var shootsArr = $scope.clients.shoots;
							var thumbnails = [];
							shootsArr.forEach(function(item){
								var obj = {
									id: item._id,
									image: item.photos[0],
									images: item.photos,
									date: item.createdAt,
									subject: item.subject
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