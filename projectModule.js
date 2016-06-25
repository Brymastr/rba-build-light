this.projects = [];

var light = require('./lightModule')
var log = require('./logger');

exports.updateProjectStatus = function(project, status) {
  if(this.projects === undefined) this.projects = [];
  if(this.projects.length == 0) {
    log.info('New project: ' + project);
    this.projects.push({
      'title': project,
      'status': status
    });
  }
  var exists = false;
  this.projects.forEach(function(x) {
    if(x.title == project) {
      x.status = status;   
      exists = true;   
    }
  });
  if(!exists) {
    log.info('New project: ' + project);
    this.projects.push({
      "title": project,
      "status": status
    });
  }
    
  log.info((status === 'passing' ? 'PASSING: ' : 'FAILING: ') + project);
}

exports.changeLight = function(done) {
  for(x in this.projects) {
    if(this.projects[x].status == 'failing') {
      light.changeColor('red', function(){});
      return done('failing');        
    }
    if(x == this.projects.length - 1) {
      light.changeColor('green', function(){});
      return done('passing');
    }
  }
  return done('no projects');
}