var express = require('express');

module.exports = function() {
  
  var router = express.Router();
  
  router.route('/test')
    .post(function(req, res) {
      res.json(req);
    })
    .get(function(req, res) {
      res.send("get");
    });
    
  return router;
}