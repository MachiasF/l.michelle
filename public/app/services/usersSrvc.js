var app = angular.module('myApp');

app.service('userSrvc', function($http){
	var rootUrl = "/user"
	this.getUser = function (){
		return $http({
			method: 'GET',
			url: rootUrl
		}).then(function(response){
			if (response.status != 200) {
				return "Error!";
			}
			return response.data;
		});
	};
	this.updateUser = function(profileChanges, userId){
		return $http({
			method: 'PUT',
			url: '/api/users/' + userId,
			data: profileChanges
		}).then(function(response){
			if(response.status != 200){
				return "Error!"
			}
			return response;
		})
	};
	this.getUserAlbums = function(id){
		return $http({
			method: 'GET',
			url: '/api/users/' + id
		}).then(function(response){
			if(response.status != 200) {
				return "Error";
			}
			return response.data;
		});
	};
	this.getCurrentAlbum = function(id){
		return $http({
			method: 'GET',
			url: '/api/shoots/' + id
		}).then(function(response){
			if(response.status != 200){
				return "Error";
			}
			return response.data;
		})
	}
});