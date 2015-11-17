var app = angular.module('myApp')

app.controller('adminShootCtrl', function($scope, adminSrvc, Upload, $route, $location){
    
    $scope.currentClient = $route.current.params.name;
    
    


    //-------client album upload form-----
    $scope.submit = function() {

        var images = $scope.files;
        var albumArr = [];
        if (!Array.isArray(images)){
          images = [images];
        } 

        
        images.forEach(function(image) {
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            var fileBody = reader.result;
            albumArr.push({ base64: fileBody,  file : {name: image.name, type: image.type} });
            if (albumArr.length == images.length) {
              var dataToPost = {
                client: $route.current.params.id,
                subject: $scope.subject,
                style: $scope.styleOf,
                notes: $scope.notes,
                photos: albumArr
              };
              adminSrvc.createShootInfo(dataToPost).then(function(reponse) {
                $location.path('/admin/users/' + $route.current.params.name + '/' + $route.current.params.id)
              });
            }
          }
          reader.readAsDataURL(image)
        })
        
        
    };
    
  
  

});