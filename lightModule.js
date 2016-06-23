var spawn = require("child_process").spawn,child;
var log = require('./logger');

this.currentColor = 'green';

exports.changeColor = function(color, cb) {
  
  if(this.currentColor == color) cb();
  this.currentColor = color;
  
  var child = spawn("powershell.exe", ["./lightcontrol.ps1 " + color]);
  
  child.stdout.on('data', function(data) {
    log.debug('From Powershell: ' + data);
  });
  
  child.stderr.on("data", function(data) {
    log.error('Powershell Errors: ' + data);
  });
  
  child.on('exit', function() {
    log.debug('Powershell script finished');
    cb();
  });
  
  child.stdin.end();
}