var fs = require('fs');

this.logLevel;
this.logFile = './logs/log.txt';
this.levels = ['debug', 'info', 'error']; // low to high

exports.debug = function(message) {
  this.write('debug', message);
}

exports.info = function(message) {
  this.write('info', message);
}

exports.error = function(message) {
  this.write('error', message);
}

exports.write = function(level, message) {
  if (this.levels.indexOf(level) < this.levels.indexOf(this.logLevel) ) {
    return;
  }
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  message = new Date().toISOString() + ' ' + level + ': ' + message;
  console.log(message);
  fs.appendFile(this.logFile, message + '\r\n');
}