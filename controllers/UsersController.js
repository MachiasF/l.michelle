var Users = require('../models/User');

module.exports = {
    create: function(req, res) {
            console.log(req.body);
            Users.create(req.body, function(err, result) {
                if (err) {
                 	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    update: function(req, res) {
            Users.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    showToAdmin: function(req, res) {
    		Users.findById(req.params.id).populate({
                path: 'shoots',
                select: 'client photos createdAt'
            }).exec(function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    showToUser: function(req, res) {
            Users.findById(req.params.id).populate({
                path: 'shoots'
            }).exec(function(err, result){
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
    read: function(req, res) {
        Users.find({}, function(err, result){
          if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
    delete: function(req, res) {
        Users.findByIdAndRemove(req.params.id, function(err, result){
          if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
    }
};
