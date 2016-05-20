var spawn = require("child_process").spawn,child;
var log = require('./logger');

exports.changeColor = function(color) {
  var child = spawn("powershell.exe", ["./lightcontrol.ps1 " + color]);
  
  child.stdout.on('data', function(data) {
    log.debug('From Powershell: ' + data);
  });
  
  child.stderr.on("data", function(data) {
    log.error('Powershell Errors: ' + data);
  });
  
  child.on('exit', function() {
    log.debug('Powershell script finished');
  });
  
  child.stdin.end();
}