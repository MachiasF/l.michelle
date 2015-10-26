var mongoose = require('mongoose');

var schema = new mongoose.Schema ({
	facebookId: {
		type: Number
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
		type: String,
		maxlength: 12
	},
	address: {
		type: String
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