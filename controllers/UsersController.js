var Users = require('../models/Users');

module.exports = {
    create: function(req, res) {
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
    read: function(req, res) {
    		Users.findById(req.params.id, function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    }
};