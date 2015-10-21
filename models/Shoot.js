var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		client: {
			type: String
		},
		createdAt: {
			type: String
		},
		subject: {
			type: String
		},
		style: {
			type: String,
			lowercase: true,
			enum: ['infant', 'maternity', 'child', 'wedding', 'graduation', 'family', 'boudior']
		},
		photos: [{
			data: String
		}]


});

module.exports = mongoose.model('Shoot', schema);