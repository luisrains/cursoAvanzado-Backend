'use strict'

//usamos mongoose como orm
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = Schema({
	name: String,
	surname: String,
	email: String,
	password: String,
	role: String
});

module.exports = mongoose.model('user', userSchema);