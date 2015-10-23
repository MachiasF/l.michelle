var app = angular.module('myApp')

app.controller('adminShootCtrl', function($scope, adminSrvc, Upload, $route, $location){
    
    $scope.currentClient = $route.current.params.name;
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) { dd='0'+dd } 
    if(mm<10) { mm='0'+mm }
    today = mm+'/'+dd+'/'+yyyy;

    $scope.submit = function() {

        //---image array posted to S3------
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
                subjectMatter: $scope.subject,
                style: $scope.styleOf,
                notes: $scope.notes,
                createdAt: today,
                photos: albumArr
              };
              adminSrvc.createShootInfo(dataToPost).then(function(reponse) {
                $location.path('/admin/users/' + $route.current.params.name + '/' + $route.current.params.id)
              });
            }
          }
          reader.readAsDataURL(image)
        })
        
        // for (var i = 0; i < images.length; i++) {

        //   var file = images[i];
        //   var reader = new FileReader();
        //   reader.onload = function(loadEvent) {
        //     var fileBody = reader.result;
        //     albumArr.push(fileBody);
        //     if (albumArr.length === images.length){
        //       console.log (albumArr);
        //     }
        //   }
          
        //   reader.readAsDataURL(file);
         
        // }

        //----client info
        
    };

  
  

});