var app = angular.module('myApp');

app.service('homeSrvc', function($http, $q){
	this.backgrounds = ['background1.jpg', 'background2.jpg', 'background3.jpg', 'background4.jpg', 'background5.jpg', 'background6.jpg', 'background7.jpg', 'background8.jpg', 'background9.jpg'];
	this.randomBackground = this.backgrounds[Math.floor(Math.random() * this.backgrounds.length)];
});