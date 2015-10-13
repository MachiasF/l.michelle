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
	sessions: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Session'
	}
});

module.exports = mongoose.model('User', schema);