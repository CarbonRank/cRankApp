var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var request 		= require('request');
var fs = require('fs');

var port = process.env.PORT || 3000;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var dbpassword = fs.readFileSync('db').toString().split('\n')[0];
var url = 'mongodb://crankadmin:'+dbpassword+'@ds017688.mlab.com:17688/crank';

MongoClient.connect(url, function(err, db) {
	if (err) {
	    console.log('Unable to connect to the mongoDB server. Error:', err);
	} 
	else{
	   	console.log('Connection established to', url);
	    db.close();
  }
});

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./api')(app, request);

app.listen(port);

console.log('cRanking that shit up at ' + port);

exports = module.exports = app;