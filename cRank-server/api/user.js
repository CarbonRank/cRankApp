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
router.post('/', function(req, res, next) {
    var user = req.body;
    if(isValidUser(user)) {
        User.findOne({username: user.username}, function(err, user) {
            if(err) res.send(err);
            if(user) {
                console.log('user already exists. user: ' + username);
                res.send(false);
            } else {
                var newUser = new User();
                newUser.username = user.username;
                newUser.firstName = user.firstName;
                newUser.lastName = user.lastName;
                newUser.password = newUser.generateHash(user.password);
                newUser.save(function(err) {
                    if(err) res.send(err);
                    else {
                        res.send(newUser);
                    }
                })
            }
        });
    } else {
        res.send(false);
    }
});

function isValidUser(user) {
    if(!user.username) return false;
    if(!user.username.length < 4) return false;
    if(!user.password.length < 4) return false;
    if(!user.firstName) return false;
    if(!usern.lastName) return false;
    return true;
}

module.exports = router;

