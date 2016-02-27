var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose 		= require('mongoose');
var config			= require('./config');
var vehicleRoute	= require('./api/vehicle');
var userRoute		= require('./api/user');

var port = process.env.PORT || 3000;

var dburi = 'mongodb://' + config.dbusername + ':' + config.dbpass + '@ds017688.mlab.com:17688/crank';

mongoose.connect(dburi, function(err) {
	if(err) console.log("DB ERROR: ", err);
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/api/vehicle', vehicleRoute);
app.use('/api/user', userRoute);

app.listen(port);

console.log('cRanking that shit up at ' + port);

exports = module.exports = app;