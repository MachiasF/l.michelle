var app = angular.module('myApp');

app.service('userSrvc', function($http){
	var rootUrl = "/users"
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
	// var userArray = this.getUser();
	// this.routeCurrentUser = function (user) {
	// 	for (var i = 0; i < userArray.length; i++){
	// 		for (_id in userArray[i]) {
	// 			if (userArray[i]._id === user){
	// 				console.log(userArray[i]);
	// 				return userArray[i];
	// 			}
	// 		}
	// 	}
	// }
});