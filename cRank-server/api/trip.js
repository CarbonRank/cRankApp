var express = require('express');
var router = express.Router();
var Trip = require('../model/trip');
var User = require('../model/user');


/*
    userid: String,
    startTime: Number, 
    endTime: Number,
    totalTripC: Number
*/
// new trip
router.post('/', function(req, res, next) {
    var trip = req.body;
    if(isValidTrip(trip)) {
        var newTrip = new Trip();
        newTrip.userid = trip.userid;
        newTrip.startTime = trip.startTime;
        newTrip.endTime = trip.endTime;
        newTrip.totalTripC = trip.totalTripC;
        newTrip._user = trip.userid;
        User.update(
            { _id: trip.userid }, 
            { $inc: { totalCarbon: trip.totalTripC}},
            { upsert: true },
            function(cb) {
                console.log('saved user?');
                newTrip.save(function (err) {
                    if(err) {res.send(false);return;}
                    res.send(newTrip);
                });
            }
        );
    } else {
        res.send(false);
    }
});

router.get('/', function(req, res, next) {
    Trip
    .find({})
    .populate('_user')
    .sort({'_id': -1})
    .exec(function (err, trips) {
        if (err) res.send(false);
        res.send(trips);
    });
});

function isValidTrip(trip) {
    if(!trip.userid) return false;
    if(!trip.startTime) return false;
    if(!trip.endTime) return false;
    if(trip.totalTripC == null) return false;
    return true;
}


module.exports = router;

