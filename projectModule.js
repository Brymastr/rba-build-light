this.projects = []; // pass, fail

var light = require('./lightModule')
var log = require('./logger');

exports.updateProjectStatus = function(project, status) {
  
  if(this.projects.length == 0) {
    log.info('New project: ' + project);
    this.projects.push({
      'title': project,
      'status': status
    });
  }
  for(x in this.projects) {
    if(this.projects[x].title == project) {
      this.projects[x].status = status;
      break;
    }
    if(x == this.projects.length - 1) {
      log.info('New project: ' + this.projects[x].title);
      this.projects.push({
        "title": project,
        "status": status
      });
    }
  }
  
  log.info((status === 'pass' ? 'PASS: ' : 'FAIL: ') + project);
}

exports.changeLight = function(done) {
  for(x in this.projects) {
    if(this.projects[x].status === 'fail') {
      light.changeColor('red');
      return done('fail');
    }
    if(x == this.projects.length - 1) {
      light.changeColor('green');
      return done('pass');
    }
  }
  return done('no projects');
}