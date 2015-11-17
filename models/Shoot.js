var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
		client: {
			type: String
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		subject: {
			type: String
		},
		style: {
			type: String,
			enum: ['Infant', 'Maternity', 'Children', 'Birth', 'Portrait', 'Family', 'Boudoir']
		},
		photos: []


});

module.exports = mongoose.model('Shoot', schema);