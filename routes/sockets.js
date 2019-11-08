var net         = require('net')
var fs          = require("fs");
var logging     = require('../utils/logger');
var util        = require('util');
var sockFile    = '/tmp/vm_remote.sock';

try {
  fs.unlinkSync(sockFile)
  //file removed
} catch(err) {
  console.error(err)
}

var server = net.createServer(function(client) { 
    
    logging.info('', util.format('client connected (%s)', client.address));

    client.on('data',function(data){
        logging.info('', util.format('received data : %s', data))
        client.write(sendData);
    });

    client.on('end', function() {
        logging.info('', util.format('client disconnected'))
    });
});

server.on('error', function (e) {
    //unix sock 사용시
    if (e.code == 'EADDRINUSE') {
        logging.error('', 'Server running, giving up...');
        process.exit();
    }
});

server.listen(sockFile, function() { //UNIX domain sockets  사용시 
    logging.info('', util.format('PID ['+process.pid+'] TCP Server listening'));
});

module.exports = server;