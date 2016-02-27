var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var mongoose 		= require('mongoose');
var vehicleRoute	= require('./api/vehicle');
var userRoute		= require('./api/user');
var tripRoute       = require('./api/trip');

var port = process.env.PORT || 3000;
var dbusername;
var dbpass;
try {
    var config = require('./config');
    console.log("Using config file.");
    dbusername = config.dbusername;
    dbpass = config.dbpass;
} catch(err){
    if(err.code === 'MODULE_NOT_FOUND'){
    	console.log("Config file not found. Using env vars");
    	dbusername = process.env.DBUSERNAME;
    	dbpass = process.env.DBPASS;
    }
}

var dburi = 'mongodb://' + dbusername + ':' + dbpass + '@ds017688.mlab.com:17688/crank';

mongoose.connect(dburi, function(err) {
	if(err) console.log("DB ERROR: ", err);
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/api/vehicle', vehicleRoute);
app.use('/api/user', userRoute);
app.use('/api/trip', tripRoute);

app.listen(port);

console.log('cRanking that shit up at ' + port);

exports = module.exports = app;