var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		date: {
			type: String
		},
		subject: {
			type: String,
		},
		style: {
			type: String,
		},
		photos: [{
			data: Buffer,
			contentType: String
		}]


});

module.exports = mongoose.model('Shoot', schema);