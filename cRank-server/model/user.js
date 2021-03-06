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
	totalCarbon: {
		type: Number,
		default: function() { 	//set this to 0 for production
			return Math.floor(Math.random() * 3000) + 100;
		}
	},
	imgurl: {
		type: String,
		default: function() { 	//set this to 0 for production
			var url;
			if(Math.floor(Math.random() * 2) == 0) {
				url = 'http://api.randomuser.me/portraits/women/' + (Math.floor(Math.random() * 50) + 1) + '.jpg'
			} else {
				url = 'http://api.randomuser.me/portraits/men/' + (Math.floor(Math.random() * 50) + 1) + '.jpg'
			}
			return url;
		}
	},
	vehicle: {
		vehicleId: Number,
		year: Number,
		make: String,
		model: String,
		options: String,
		meta: {
			co2: Number, //tailpipe CO2 in grams/mile for fuelType1
			mpg: Number, //combined MPG for fuelType1
			ghg: Number, //EPA GHG score (-1 = Not available)
		}
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