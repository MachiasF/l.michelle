var Admins = require('../models/Admin');

module.exports = {
    create: function(req, res) {
            Admins.create(req.body, function(err, result) {
                if (err) {
                 	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    update: function(req, res) {
            Admins.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, result) {
                if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    read: function(req, res) {
    		Admins.find({}, function(err, result){
    		 	if (err) {
                  	res.send(err);
                } else {
                  	res.json(result);
                }
            });
    },
    delete: function(req, res) {
        console.log(req.params.id);
            Admins.findByIdAndRemove(req.params.id, function(err, result) {
                if (err) {
                    return res.status(500).send(err);
                } else {
                    res.json(result);
                }
            });
    },
};

  // destroy: function(req, res) {
  //   Book.findByIdAndRemove(req.params.id, function(err, result) {
  //     if (err) return res.status(500).send(err);
  //     res.json(result);
  //   });
  // }