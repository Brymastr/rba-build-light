var request = require('request');
var projectModule = require('./projectModule');

const timeout = process.env.USB_LIGHT_BOOMI_TIMEOUT || 20000;
const url = process.env.USB_LIGHT_BOOMI_URL || 'https://cc1.sfdctest.rbaenv.com:9443/projTEST/ws/simple/getBoomiStatus';
const username = process.env.USB_LIGHT_BOOMI_USERNAME || 'projTEST@ritchiebrosauctioneers-Z36KY7';
const password = process.env.USB_LIGHT_BOOMI_PASSWORD || '6123765f-3fd3-482b-a73c-7997b00cd298';

exports.boomiJob = function() {
  request.get(
    url,
    {
      'auth': {
        'user': username,
        'pass': password
      }
    },
    function(err, response, body) {
      try {
        body = JSON.parse(body);
      } catch(err) {
        body = err;  
      } finally {
        var boomiStatus = 'pass';
        if(body.Status != 'Good') boomiStatus = 'fail'
        projectModule.updateProjectStatus('Boomi', boomiStatus);
        projectModule.changeLight(function() {
          // Maybe do something
        });
      }
  });
}