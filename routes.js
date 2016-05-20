var express = require('express');
var projectModule = require('./projectModule');

module.exports = function() {
  
  var router = express.Router();
  
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
      res.send('update status');
    });
    
  return router;
}