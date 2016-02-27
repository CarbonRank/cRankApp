var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	first_name: String,
	last_name: String,
	password: String, 
	totalCarbon: Number,
	Car: [{
		make: String,
		model: String, 
		year: Number, 
		co2: Number
	}]
});

module.exports = mongoose.model('User', userSchema);