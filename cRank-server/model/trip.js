var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tripSchema = new Schema({
	userid: String,
	startTime: Number, 
	endTime: Number, 
	totalMiles: Number,
	totalTripC: Number,
	totalFuel: Number
});

module.exports = mongoose.model('Trip', tripSchema);