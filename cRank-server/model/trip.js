var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tripSchema = new Schema({
	startTime: Number, 
	endTime: Number, 
	totalMiles: Number,
	totalTripC: Number,
	totalFuel: Number,
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Trip', tripSchema);