var app = angular.module('myApp');

app.service('adminSrvc', function($http){
	var rootUrl = "/api/admins"
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
	this.createShootInfo = function(obj){
		return $http({
			method: 'POST',
			url: "/api/shoots",
			data: obj
		}).then(function(response){
			if (response.status != 200){
				return "ERROR";
			}
			return response.data;
		});
	};
	this.createShootImages = function(arrOfImages) {
    	for(var i = 0; i < arrOfImages.length; i++) {

    	}
    	
	        var fileObj = {
	            fileName: fileObj.name,
	            fileBody: fileBody,
	            fileType: fileObj.type
	        }
	        
	        return $http({
	            method: 'POST',
	            url: '/images',
	            data: fileObj
	        });
	    }    
    };    
});