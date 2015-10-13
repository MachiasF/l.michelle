var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
				.when('/home', {
					templateUrl: 'app/scripts/home/home.html',
					controller: 'homeCtrl'
				})
				.when('/admin', {
					templateUrl: 'app/scripts/admin/admin.html',
					controller: 'adminCtrl'
				})
				.when('/portfolio', {
					templateUrl: 'app/scripts/portfolio/portfolio.html',
					controller: 'portfolioCtrl'
				})
				.when('/clients', {
					templateUrl: 'app/scripts/clients/clients.html',
					controller: 'clientsCtrl'
				})
				.when('/clients/:clientId/:sessionId',{
					templateUrl: 'app/scripts/sessions/sessions.html',
					controller: 'sessionsCtrl'
				})
				.otherwise('/home')
});