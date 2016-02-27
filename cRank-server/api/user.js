var express = require('express');
var router = express.Router();
var User = require('../model/user');

//get all users, because why not
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        res.send(users);
    });
});

//register a new user
router.post('/newuser', function(req, res, next) {
    var userData = req.body;
    console.log("userData", userData);
    if(isValidUser(userData)) {
        User.findOne({username: userData.username}, function(err, user) {
            if(err) {console.log('err: ', err);res.send(err);return;}
            if(user) {
                console.log('user already exists. user: ' + userData.username);
                res.send(false);
            } else {
                var newUser = new User();
                newUser.username = userData.username;
                newUser.firstName = userData.firstName;
                newUser.lastName = userData.lastName;
                newUser.password = newUser.generateHash(userData.password);
                newUser.save(function(err) {
                    if(err) res.send(err);
                    else {
                        res.send(newUser);
                    }
                })
            }
        });
    } else {
        // console.log(req.query.username);
        res.send('not a valid user. check data');
    }
});

//login
router.post('/login', function(req, res, next) {
    var userData = req.body;
    if(!userData.username || !userData.password) {
        res.send(false);
        return;
    }
    User.findOne({username: userData.username}, function(err, user) {
        if(err) {res.send(err);return;}
        if(!user) {
            res.send("user does not exist.");
            return;
        }
        if (!user.validPassword(userData.password)){
            res.send("wrong password");
            return;
        }
        res.send(user);
    });
});

//login
router.post('/addvehicle', function(req, res, next) {
    var userid = req.query.userid;
    var vehicleId = req.query.vehicleid;
    if(!userid || !vehicleId) {
        res.send('missing userid or vehicleid');
        return;
    }
    User.findById(userid, function(err, user) {
        if(err) {res.send(err);return;}
        if(!user) {
            res.send("user does not exist.");
            return;
        }
        user.vehicleId = vehicleId;
        user.save(function (err) {
            if(err) {res.send(err);return;}
            res.send(user);
        });   
    });
});


//end of trip, add trip and all its details to db for a specific user and update user's total carbon and miles
router.post('/addTrip', function (req, res, next) {
    var userID = req.query.userid;
    var carbon = req.query.carbon;
    var start = req.query.start;
    var end = req.query.end;
    var miles = req.query.miles;

    if(userID && carbon && start && end && miles){
        var newTrip = Trip({
            start_dateTime:  start,
            end_dateTime: end,
            total_miles: miles,
            total_CO2: carbon,
            total_fuelCost: miles //* price per mile (or whatever)
        });

        newTrip.save(function(err) {
            if (err) {
                res.send(err);
            }
        });

        User.findByIdAndUpdate( {userID}, { total_CO2 : total_CO2 + carbon, total_miles : total_miles + miles}, function(err, user) {
            if(err) {
                res.send(err);
            }
        });
    }
    else{
        res.send("missing field(s), check data");
    }
});

function isValidUser(user) {
    if(!user.username) return false;
    if(user.username.length < 4) return false;
    if(!user.password) return false;
    if(user.password.length < 4) return false;
    if(!user.firstName) return false;
    if(!user.lastName) return false;
    return true;
}

module.exports = router;

