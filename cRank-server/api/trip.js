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
        User.update(
            { _id: trip.userid }, 
            { $inc: { totalCarbon: trip.totalTripC}},
            { upsert: true },
            function(cb) {
                console.log('saved user?');
                newTrip.save(function (err) {
                    if(err) {res.send(err);return;}
                    res.send(newTrip);
                });
            }
        );
    } else {
        res.send('not valid trip. check data');
    }
});

router.get('/', function(req, res, next) {
    Trip.find({}, function(err, trips) {
        res.send(trips);
    });
});

function isValidTrip(trip) {
    if(!trip.userid) return false;
    if(!trip.startTime) return false;
    if(!trip.endTime) return false;
    if(!trip.totalTripC) return false;
    return true;
}


module.exports = router;

