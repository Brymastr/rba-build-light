var fs = require('fs');

this.logLevel = 'info'; // Default, unless otherwise set in index.js

exports.log = function(level, message) {
  
  var levels = ['debug', 'info', 'error'];
  var logFile = './logs/log.txt';
  if (levels.indexOf(level) >= levels.indexOf(this.logLevel) ) {
    if (typeof message !== 'string') {
      message = JSON.stringify(message);
    };
    message = new Date().toISOString() + ' ' + level + ': ' + message;
    console.log(message);
    fs.appendFile(logFile, message + '\r\n');
  }
}