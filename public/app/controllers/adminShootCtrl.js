var app = angular.module('myApp')

app.controller('adminShootCtrl', function($scope, adminSrvc, Upload, $route){
    
    $scope.currentUser = $route.current.params.name;
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd } 
    if(mm<10) { mm='0'+mm }
    today = mm+'/'+dd+'/'+yyyy;

    $scope.submit = function() {
        var dataToPost = {
          client: $scope.currentUser,
          subjectMatter: $scope.subject,
          style: $scope.styleOf,
          notes: $scope.notes,
          createdAt: today,
        };
        var album = $scope.files;
        adminSrvc.createShootInfo(dataToPost);
        adminSrvc.createShootImages(album);
        console.log(dataToPost);
        console.log($scope.files);
        
    };

  
  

});