var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		client: {
			type: String
		},
		createdAt: {
			type: Date
		},
		subject: {
			type: String
		},
		style: {
			type: String,
			enum: ['baby', 'birth', 'maternity', 'child', 'wedding', 'personal', 'family', 'boudior']
		},
		photos: [{
			data: Buffer,
			contentType: String
		}]


});

module.exports = mongoose.model('Shoot', schema);