'use strict';

var mongoose = require('mongoose');
var	Schema = mongoose.Schema;

var UserSchema = new Schema({
	displayName: {
		type: String,
		trim: true,
		default: ''
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	lastAccess: {
		type: Date
	}
});

mongoose.model('User', UserSchema);
