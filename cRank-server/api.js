module.exports = function(app, request) {

    app.get('/', function(req, res) {
        res.send('hello world');
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
