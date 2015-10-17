var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
	facebookId: {
		type: String
	},
	name: {
		type: String,
		maxlength: 50
	},
	email: {
		type: String,
		maxlength: 50
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
	}], 
	admin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('User', schema);