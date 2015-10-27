var Shoots = require('../models/Shoot');
var AWS = require('../services/AmazonService')
var User = require('../models/User');

module.exports = {
    create: function(req, res) {

            var photos = req.body.photos;
            // console.log(22222222, photos)
            var shootPhotos = [];
            photos.forEach(function(photo) {
                // base64
                // file
                var buf = new Buffer(photo.base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
                var getRandomIndexNumber = function() {
                    return Math.floor(Math.random() * (10000 - 1000)) + 1000;
                };
                var photo = {
                    name: getRandomIndexNumber() + photo.file.name,
                    body: buf,
                    type: photo.file.type
                }

                AWS.uploadToS3(photo, function(err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err)
                    }
                    shootPhotos.push(data.Location)
                    if (shootPhotos.length == photos.length) {
                        req.body.photos = shootPhotos;
                        console.log(req.body.photos);
                        Shoots.create(req.body, function(err, result) {
                            if (err) {
                                console.log(err)

                                res.send(err);
                            } else {
                                console.log(result._id);
                                User.findById(req.body.client, function(err, user) {
                                    if(!user.shoots) {
                                        user.shoots = [];
                                    }
                                    user.shoots.push(result._id)
                                    user.save()
                                    res.json(result);
                                })
                            }
                        });
                    }
                })

            })

            

           
    },
    update: function(req, res) {
            Shoots.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    read: function(req, res) {
    		Shoots.find({}, function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    show: function(req, res) {
            Shoots.findById(req.params.id, function(err, result){
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
    delete: function(req, res) {
            Shoots.findByIdAndRemove(req.params.id, function(err, result) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    User.findById(req.body.clientId, function(err, user){
                        if (err) {
                                console.log(err)

                                res.send(err);
                        } else {
                            console.log(111111, req.body.photos);
                            var photosReqArray = req.body.photos;
                            var photosToDeleteFromS3 =  [];
                            for (var i = 0; i < photosReqArray.length; i++){
                                photosToDeleteFromS3.push({Key: photosReqArray[i]});
                            }
                            if (photosToDeleteFromS3.length == photosReqArray.length){
                                var shootsArr = user.shoots;
                                var indexNum = shootsArr.indexOf(req.params.id);
                                if(indexNum >= 0){
                                    shootsArr.splice(indexNum, 1);
                                    user.save();
                                    AWS.deleteFromS3(photosToDeleteFromS3, function(err, result){
                                        if (err) {
                                            res.send("failed to delete from s3")
                                        } else {
                                            res.json(result);
                                        }
                                    })
                                    
                                } else {
                                    res.send("Error: 123124 - We could not find a photoshoot for that user")
                                }
                            }    
                        }
                    })
                }
            });
    },
};