var express = require('express');
var projectModule = require('./projectModule');
var light = require('./lightModule');

module.exports = function() {
  
  var router = express.Router();
  
  router.route('/status/:project/:status').all(function(req, res) {
    projectModule.updateProjectStatus(req.params.project, req.params.status);
    projectModule.changeLight(function(status) {
     res.send(status);    
    });
  });
  
  router.route('/test/changeColor/:color').all(function(req, res) {
    light.changeColor(req.params.color, function() {
      res.send('Changed color to ' + req.params.color);
    });
  });
    
  router.route('/projects')
    .get(function(req, res) {
      res.json(projectModule.projects);
    });
        
  return router;
}