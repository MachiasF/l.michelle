var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		client: {
			type: String,
		},
		subject: {
			type: String,
		},
		style: {
			type: String,
		},
		photo1: {
			type: Buffer,
			contentType: String
		},
		photo2: {
			type: Buffer,
			contentType: String
		},
		photo3: {
			type: Buffer,
			contentType: String
		},
		photo4: {
			type: Buffer,
			contentType: String
		},
		photo5: {
			type: Buffer,
			contentType: String
		},
		photo6: {
			type: Buffer,
			contentType: String
		},
		photo7: {
			type: Buffer,
			contentType: String
		},
		photo8: {
			type: Buffer,
			contentType: String
		}


});

module.exports = mongoose.model('Session', schema);