var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
	name: {
		type: String,
		maxlength: 50,
		required: true
	},
	email: {
		type: String,
		maxlength: 50,
		required: true
	},
	password: {
		type: String,
		minlength: 8,
		required: true
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
	},
	phone: {
		type: Number,
		maxlength: 12,
	},
	streetAddress: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: Number
	},
	shoots: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Shoot'
	}]
});

module.exports = mongoose.model('User', schema);