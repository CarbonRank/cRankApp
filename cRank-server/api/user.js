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



/*register a new user 
body: {
    username
    firstname
    lastname
    password
    imgurl
    vehicleid 
}
*/
router.post('/', function(req, res, next) {
    var data = req.body;
    if(isValidUser(data)) {
        User.findOne({username: data.username}, function(err, user) {
            if(err) res.send(err);
            if(user) {
                console.log('user already exists. user: ' + data.username);
                res.send(false);
                return;
            } 

            var newUser = new User();
            newUser.username = data.username;
            newUser.firstName = data.firstName;
            newUser.lastName = data.lastName;
            newUser.password = newUser.generateHash(data.password);
            newUser.imgurl = data.imgurl;
            newUseer.totalCarbon = 0;

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
                        if(err) {res.send(err);return;}
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


// //end of trip, add trip and all its details to db for a specific user and update user's total carbon and miles
// router.post('/addTrip', function (req, res, next) {
//     var userID = req.query.userid;
//     var carbon = req.query.carbon;
//     var start = req.query.start;
//     var end = req.query.end;
//     var miles = req.query.miles;

//     if(userID && carbon && start && end && miles){
//         var newTrip = Trip({
//             start_dateTime:  start,
//             end_dateTime: end,
//             total_miles: miles,
//             total_CO2: carbon,
//             total_fuelCost: miles //* price per mile (or whatever)
//         });

//         newTrip.save(function(err) {
//             if (err) {
//                 res.send(err);
//             }
//         });

//         User.findByIdAndUpdate( {userID}, { total_CO2 += carbon, total_miles += miles}, function(err, user) {
//             if(err) {
//                 res.send(err);
//             }
//         });
//     }
//     else{
//         res.send("missing field(s), check data");
//     }
// });

//add vehicle to a user
router.post('/addvehicle', function(req, res, next) {
    var userid = req.query.userid;
    var vehicleid = req.query.vehicleid;
    if(!userid || !vehicleid) {
        res.send('missing userid or vehicleid');
        return;
    }
    var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/'+vehicleid;
    User.findById(userid, function(err, user) {
        if(err) {res.send(err);return;}
        if(!user) {
            res.send("user does not exist.");
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

