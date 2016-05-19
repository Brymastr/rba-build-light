var express = require('express');
var http = require('http');
var schedule = require('node-schedule');
var request = require('request');

var app = express();

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express routing
var routes = require('./routes')();

app.use('/api', routes);

let port = 9000

http.createServer(app).listen(port, function() {
  console.log("server listening on port " + port);
  boomiJob();
});

schedule.scheduleJob('0 10 * * * *', function() {
  boomijob();
  console.log('Boomi job ran');
});

function boomiJob() {
  // all the stuff for boomi that the old ps1 script did
  const timeout = 20000;
  const url = 'https://cc1.sfdctest.rbaenv.com:9443/projTEST/ws/simple/getBoomiStatus';
  const auth = 'Basic cHJvalRFU1RAcml0Y2hpZWJyb3NhdWN0aW9uZWVycy1aMzZLWTc6NjEyMzc2NWYtM2ZkMy00ODJiLWE3M2MtNzk5N2IwMGNkMjk4';
  const username = 'projTEST@ritchiebrosauctioneers-Z36KY7';
  const password = '6123765f-3fd3-482b-a73c-7997b00cd298';
  
  // Send the reqest to boomi
  request.get(
    url,
    {
      'auth': {
        'user': username,
        'pass': password
      }
    },
    function(err, response, body) {
      try {
        body = JSON.parse(body);
        
      } catch(err) {
        body = err;  
      } finally {
        if(body.Status === 'Good')
          console.log('success');
        else 
          console.log('error');
      }
  });
 
  
}