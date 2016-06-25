var express = require('express');
var http = require('http');
var schedule = require('node-schedule');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var log = require('./logger');

var app = express();
app.use(bodyParser.json());
const port = process.env.USB_LIGHT_API_PORT || 9000;
const db = process.env.USB_LIGHT_DB_CONN;
log.logLevel = process.env.USB_LIGHT_LOG_LEVEL || 'info';

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  next();
});

// Middleware to log all api requests
app.use('*', function(req, res, next) {
  log.info(req.method + ': ' + req.baseUrl);
  next();
});

// Database (if in use(only docker version for now))
if(db != undefined) {
  mongoose.connect(db);
  mongoose.connection.on('open', function() {
    log.info('Mongo connection is open. Connected to: ' + db);
  });  
}

// Express routing
var routes = require('./routes')();
app.use('/api', routes);

// Start api server
http.createServer(app).listen(port, function() {
  log.info('Application startup');
  log.info('server listening on port ' + port);
});