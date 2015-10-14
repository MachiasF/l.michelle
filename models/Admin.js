var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	safetyAnswer1: {
		type: String,
		lowercase: true
	},
	safetyAnswer2: {
		type: String,
		lowercase: true
	},
	safetyAnswer3: {
		type: String,
		lowercase: true
	}
});

module.exports = mongoose.model('Admin', schema)