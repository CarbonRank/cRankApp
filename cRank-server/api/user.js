var express = require('express');
var router = express.Router();
var User = require('../model/user');
var request = require('request');
var parseString = require('xml2js').parseString; 

//get all users, because why not
router.get('/', function(req, res, next) {
    User.find({}, function(err, users) {
        res.send(users);
    });
});

//get all users sorted by corbon fp
router.get('/sorted', function(req, res, next) {
    User.find({}).sort({totalCarbon: 1}).exec(function(err, users) {
        res.send(users);
    });
});

//delete all users **DANGER DANGER**
router.delete('/', function(req, res, next) {
    if(req.query.supersecret === "1234") {
        User.remove({}, function(data) {
            res.send(data);
        });
    } else {
        res.send(false);
    }
});

/*register a new user 
body: {
    username
    firstname
    lastname
    password
    vehicleid 
}
*/
router.post('/', function(req, res, next) {
    var data = req.body;
    if(isValidUser(data)) {
        User.findOne({username: data.username}, function(err, user) {
            if(err) res.send(false);
            if(user) {
                console.log('user already exists. user: ' + data.username);
                res.send('user already exists.');
                return;
            } 

            var newUser = new User();
            newUser.username = data.username;
            newUser.firstName = data.firstName;
            newUser.lastName = data.lastName;
            newUser.password = newUser.generateHash(data.password);

            var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/'+data.vehicleid;
            request(url, function(error, response, body) {
                parseString(body, function(err, result) {
                    if(err) {res.send(err);return;}
                    var vehicle = {
                        vehicleId: data.vehicleid,
                        year: parseInt(result.vehicle.year[0]),
                        make: result.vehicle.make[0],
                        model: result.vehicle.model[0],
                        meta: {
                            co2: result.vehicle.co2TailpipeGpm[0], //tailpipe CO2 in grams/mile for fuelType1
                            mpg: result.vehicle.comb08[0], //combined MPG for fuelType1
                            ghg: result.vehicle.ghgScore[0] //EPA GHG score (-1 = Not available)
                        }
                    }
                    newUser.vehicle = vehicle;
                    newUser.save(function (err) {
                        if(err) {res.send(false);return;}
                        res.send(newUser);
                    });   
                });
            });  
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
        if(err) {res.send(false);return;}
        if(!user) {
            res.send(false);
            return;
        }
        if (!user.validPassword(userData.password)){
            res.send(false);
            return;
        }
        res.send(user);
    });
});

//add vehicle to a user
router.post('/addvehicle', function(req, res, next) {
    var userid = req.query.userid;
    var vehicleid = req.query.vehicleid;
    if(!userid || !vehicleid) {
        res.send(false);
        return;
    }
    var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/'+vehicleid;
    User.findById(userid, function(err, user) {
        if(err) {res.send(err);return;}
        if(!user) {
            res.send(false);
            return;
        }
        request(url, function(error, response, body) {
            parseString(body, function(err, result) {
                if(err) {res.send(err);return;}
                var vehicle = {
                    vehicleId: vehicleid,
                    year: parseInt(result.vehicle.year[0]),
                    make: result.vehicle.make[0],
                    model: result.vehicle.model[0],
                    meta: {
                        co2: result.vehicle.co2TailpipeGpm[0], //tailpipe CO2 in grams/mile for fuelType1
                        mpg: result.vehicle.comb08[0], //combined MPG for fuelType1
                        ghg: result.vehicle.ghgScore[0] //EPA GHG score (-1 = Not available)
                    }
                }
                user.vehicle = vehicle;
                user.save(function (err) {
                    if(err) {res.send(err);return;}
                    res.send(user);
                });   
            });
        });
    });
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

