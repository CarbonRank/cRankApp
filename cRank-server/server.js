var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var vehicleRoute	= require('./api/vehicle');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/api/vehicle', vehicleRoute);

app.listen(port);

console.log('cRanking that shit up at ' + port);

exports = module.exports = app;