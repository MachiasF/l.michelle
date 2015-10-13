var Sessions = require('../models/Sessions');

module.exports = {
    create: function(req, res) {
            Sessions.create(req.body, function(err, result) {
                if (err) {
                 	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    update: function(req, res) {
            Sessions.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    read: function(req, res) {
    		Sessions.findById(req.params.id, function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    delete: function(req, res) {
            Sessions.findByIdAndRemove(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    },
};