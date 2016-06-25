var express = require('express');
var projectModule = require('./projectModule');
var light = require('./lightModule');
var log = require('./logger');

module.exports = function() {
  
  var router = express.Router();
  
  router.route('/status/:project/:status').all(function(req, res) {
    projectModule.updateProjectStatus(req.params.project, req.params.status);
    var set = false;    
    projectModule.changeLight(function(status) {
      if(!set)      
        res.send(status);  
      set = true;  
    });
  });
    
  router.route('/manual /changeColor/:color').all(function(req, res) {
    var set = false;
    light.changeColor(req.params.color, function() {
      if(!set)
        res.send('Changed color to ' + req.params.color);
      set = true;
    });
  });
    
  router.route('/projects')
    .get(function(req, res) {
      log.debug(projectModule.projects)
      res.json(projectModule.projects);
    })
    .delete(function(req, res) {
      log.debug('deleted project list');
      projectModule.projects = [];
      res.sendStatus(200);
    })
    .put(function(req, res) {
      log.debug('batch update projects');
      projectModule.projects = req.body;
      console.log(req.body)
      var set = false;    
      projectModule.changeLight(function() {
        if(!set)      
          res.sendStatus(200);  
        set = true;  
      });
    });
        
  return router;
}