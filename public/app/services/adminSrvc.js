var app = angular.module('myApp');

app.service('adminSrvc', function($http){
	var rootUrl = "/admins"
	this.getUsers = function (){
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
	var userArray = [this.getUsers()];
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
});