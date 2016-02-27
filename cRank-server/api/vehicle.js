var express = require('express');
var router = express.Router();
var request = require('request');
var parseString = require('xml2js').parseString;

//returns a list of available years
router.get('/year', function(req, res, next) {
    var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/year';
    request(url, function(error, response, body) {
        parseString(body, function(err, result) {
            if(!err) {
                var response = {results:[]}
                var arr = result.menuItems.menuItem;
                for(var i = 0; i<arr.length; i++) {
                    response.results.push(parseInt(arr[i].value[0]));
                }
                res.send(response);
            } else res.send(err);
        });
    });
});

//returns list of car makes in a given year
router.get('/make', function(req, res, next) {
    var year = req.query.year;
    if(year) {
        var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=' + year;
        request(url, function(error, response, body) {
            parseString(body, function(err, result) {
                if(!err) {
                    var response = {results:[]}
                    var arr = result.menuItems.menuItem;
                    for(var i = 0; i<arr.length; i++) {
                        response.results.push(arr[i].value[0]);
                    }
                    res.send(response);
                } else res.send(err);
            });
        });
    } else {
        res.send(false);
    }
});

//returns list of models for a given make and year
router.get('/model', function(req, res, next) {
    var year = req.query.year;
    var make = req.query.make;
    if(year && make) {
        var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=' + year + '&make=' + make;
        request(url, function(error, response, body) {
            parseString(body, function(err, result) {
                if(!err) {
                    var response = {results:[]}
                    var arr = result.menuItems.menuItem;
                    for(var i = 0; i<arr.length; i++) {
                        response.results.push(arr[i].value[0]);
                    }
                    res.send(response);
                } else res.send(err);
            });
        });
    } else {
        res.send(false);
    }
});

//returns a list of model options for a given mode, make, and year
router.get('/options', function(req, res, next) {
    var year = req.query.year;
    var make = req.query.make;
    var model = req.query.model;
    if(year && make && model) {
        var url = 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=' + year + '&make=' + make + '&model=' + model;
        request(url, function(error, response, body) {
            parseString(body, function(err, result) {
                if(!err) {
                    var response = {results:[]};
                    var arr = result.menuItems.menuItem;
                    for(var i = 0; i<arr.length; i++) {
                        var option = {
                            vehicleid: parseInt(arr[i].value[0]),
                            text: arr[i].text[0]
                        }
                        response.results.push(option);
                    }

                    res.send(response);
                } else res.send(err);
            });
        });
    } else {
        res.send(false);
    }
});

module.exports = router;

