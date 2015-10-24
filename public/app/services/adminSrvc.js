var app = angular.module('myApp');

app.service('adminSrvc', function($http){ 
	this.getClients = function (){
		return $http({
			method: 'GET',
			url: "/api/admins"
		}).then(function(response){
			if (response.status != 200) {
				return "Error!";
			}
			return response.data;
		});
	};
	var userArray = [this.getClients()];
	this.routeUser = function (user) {
		for (var i = 0; i < userArray.length; i++){
			for (_id in userArray[i]) {
				if (userArray[i]._id === user){
					console.log(userArray[i]);
					return userArray[i];
				}
			}
		}
	}

	//---------photoshoot web requests------------
	this.createShootInfo = function(obj){
		return $http({
			method: 'POST',
			url: "/api/shoots",
			data: obj
		}).then(function(response){
			if (response.status != 200){
				return "Error!";
			}
			return response.data;
		});
	};
	this.getClientsAlbums = function(id) {
		return $http({
			method: "GET",
			url: "/api/admins/users/" + id
		}).then(function(response){
			if(response.status != 200){
				return "Error!";
			}
			return response.data;
		})
	}


	this.deleteAlbum = function(id, clientId) {
		return $http({
			method: "PUT",
			url: "/api/shoots/" + id,
			data: {
				clientId: clientId
			}
		}).then(function(response){
			if(response.status != 200){
				return "Error!";
			}
			return response.data;
		})
	}
});