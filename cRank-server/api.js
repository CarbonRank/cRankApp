module.exports = function(app, request, parseString) {

    app.get('/api/vehicle/year', function(req, res) {
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
                } else {
                    res.send(err);
                }
            });
        });
        
    });

    app.get('/api/something', function(req, res) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                
                
            } else {
                if(bodyObj.error) {
                    res.status(bodyObj.error.code);
                    res.send(bodyObj);
                } else {
                    res.status(404);
                    res.send(false);
                }
            }
        });        
    });
};
