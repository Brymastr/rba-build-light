var express = require('express');
var http = require('http');
var schedule = require('node-schedule');
var log = require('./logger');
var jobs = require('./jobs');

var app = express();
const port = process.env.USB_LIGHT_API_PORT || 9000;
log.logLevel = process.env.USB_LIGHT_LOG_LEVEL || 'info';

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express routing
var routes = require('./routes')();

app.use('*', function(req, res, next) {
  log.info(req.method + ': ' + req.baseUrl);
  next();
});

app.use('/api', routes);

// Start api server
http.createServer(app).listen(port, function() {
  log.info('Application startup');
  log.info('server listening on port ' + port);
});

// Schedule recurring jobs
schedule.scheduleJob('0 * * * * *', function() {
  jobs.boomiJob();
  log.debug('Boomi job ran');
});