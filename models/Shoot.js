var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		subject: {
			type: String,
		},
		style: {
			type: String,
		},
		photos: [{
			type: Buffer,
			contentType: String
		}]


});

module.exports = mongoose.model('Shoot', schema);