var Shoots = require('../models/Shoot');

module.exports = {
    create: function(req, res) {
            Shoots.create(req.body, function(err, result) {
                if (err) {
                 	res.send(err);
                } else {
                  	res.json(result);
                }
            });
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
    		Shoots.findById(req.params.id, function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    delete: function(req, res) {
            Shoots.findByIdAndRemove(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
};