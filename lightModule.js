var spawn = require("child_process").spawn,child;

exports.changeColor = function(color, done) {
  var child = spawn("powershell.exe", ["./lightcontrol.ps1 " + color]);
  
  child.stdout.on('data', function(data) {
    console.log('From Powershell: ' + data);
  });
  
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  
  child.on('exit', function() {
    console.log('Powershell script finished');
  });
  
  child.stdin.end();
  
  return done();
}