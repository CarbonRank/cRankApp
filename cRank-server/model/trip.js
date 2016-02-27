var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tripSchema = new Schema({
	start_dateTime: Number, 
	end_dateTime: Number, 
	total_miles: Number,
	total_CO2: Number,
	total_fuelCost: Number
});

module.exports = mongoose.model('Trip', tripSchema);