var express     = require('express');
var router      = express.Router();
var model 			= require('../models/index');
var bodyParser	=	require("body-parser");
var logging     = require("../utils/logger");
var socket      = require("./sockets");

var net           =  require('net');
var server        =  net.createServer(onClientConnected);
var clients       =  {};

server.listen(1337, '0.0.0.0');

String.prototype.replaceAll = function(search, replacement) {
   var target = this;
   return target.replace(new RegExp(search, 'g'), replacement);
};

function onClientConnected(sock) {
   remoteAddress = sock.remoteAddress;
   console.log('new client connected: %s', remoteAddress);

   model.agents.create({
     name        : "",
     address     : remoteAddress,
     description : "",
     status      : 1
   }).catch(err => {
    model.agents.update({status: 1},
    {where: {address: remoteAddress}}).then(function(result) {
    }).catch(function(err) {
        //TODO: error handling
    });
   });
  
   clients[remoteAddress] = sock;

   sock.on('data', function(data) {
      console.log('%s Says: %s', remoteAddress, data);
      sock.write("aaa");
      sock.write(' exit');
   });
   sock.on('close',  function () {
      console.log('connection from %s closed', remoteAddress);
      clients[remoteAddress] = "disconnected";
   });
   sock.on('error', function (err) {
      console.log('Connection %s error: %s', remoteAddress, err.message);
   });

};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
/* 새로운 에이전트 추가 */
router.get('/list', function(req, res, next) {
  var agent = req.body;
  logging.info(req, "Find Agents " + agent);

  model.agents.findAll({
  }).then(result => {
     res.json(result);
  })
});

module.exports = router;
