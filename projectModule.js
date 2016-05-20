var projects = []; // pass, fail

var light = require('./lightModule')

exports.updateProjectStatus = function(project, status) {
  for(x in projects) {
    if(projects[x].title == project) {
      projects[x].status = status;
      break;
    }
    if(x == projects.length) {
      projects.push({
        "title": project,
        "status": status
      })
    }
  }
}

function changeLight() {
  for(x in projects) {
    if(projects[x].status === 'fail') {
      // go red
      break;
    }
    if(x == projects.length) {
      // go green
    }
  }
}