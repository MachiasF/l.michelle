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
	phone: {
		type: Number,
		maxlength: 12
	},
	street: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: Number,
		maxlength: 10
	},
	shoots: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Shoot'
	}]
});

module.exports = mongoose.model('User', schema);