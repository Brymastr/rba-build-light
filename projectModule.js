this.projects = []; // pass, fail

var light = require('./lightModule')

exports.updateProjectStatus = function(project, status) {
  if(this.projects.length == 0) {
    console.log('New project: ' + project);
    this.projects.push({
      "title": project,
      "status": status
    });
  }
  for(x in this.projects) {
    if(this.projects[x].title == project) {
      this.projects[x].status = status;
      break;
    }
    if(x == this.projects.length - 1) {
      console.log('New project: ' + this.projects[x].title);
      this.projects.push({
        "title": project,
        "status": status
      });
    }
  }
}

exports.changeLight = function(done) {
  console.log(this.projects);
  
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