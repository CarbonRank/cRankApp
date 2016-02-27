var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');

var userSchema = new Schema({
	username: {
		type: String,
		required: 'Username is missing.'
	},
	firstName: {
		type: String,
		required: 'First name is missing'
	},
	lastName: {
		type: String,
		required: 'Last name is missing'
	},
	password: {
		type: String,
		required: 'Wtf. Need password yo.'
	}, 
	totalCarbon: Number,
	vehicleId: {
		type: Number,
		default: null
	}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);