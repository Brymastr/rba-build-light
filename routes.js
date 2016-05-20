var express = require('express');
var projectModule = require('./projectModule');
var lightModule = require('./lightModule');

module.exports = function() {
  
  var router = express.Router();
  
  router.route('/test/changeColor/:color')
    .all(function(req, res) {
      lightModule.changeColor(req.params.color, function() {
        res.send('Changed color to ' + req.params.color);
      });
    });
  
  router.route('/test')
    .post(function(req, res) {
      res.json(req);
    })
    .get(function(req, res) {
      res.send("get");
    });
    
  
  
  router.route('/status/:project/:status')
    .all(function(req, res) {
      projectModule.updateProjectStatus(req.params.project, request.params.status);
      res.send("update status");
    });
    
  
    
  return router;
}