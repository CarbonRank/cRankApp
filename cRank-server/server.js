var express        	= require('express');
var app            	= express();
var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');
var request 		= require('request');
var parseString 	= require('xml2js').parseString;

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

require('./api')(app, request, parseString);

app.listen(port);

console.log('cRanking that shit up at ' + port);

exports = module.exports = app;