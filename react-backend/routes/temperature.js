var express = require('express');
var router = express.Router();
var SerialPort = require('serialport');

var port = new SerialPort('/dev/tty.usbmodemFD121', {
    baudRate: 57600
});

// TODO: Connect to MongoDB, return list of records as JSON to frontend
router.get('/', function(req, res, next) {
    var temperature = port.read(1);
  
    res.json([{
        time: new Date().getTime() / 1000,
        temperature: parseInt(temperature)
    }]);
});

module.exports = router;