const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');
var logger_rest = {};
 
const logger = winston.createLogger({
    level: 'debug', // 최소 레벨
    // 파일저장
    transports: [
        new winston.transports.DailyRotateFile({
            filename : 'log/system.log', // log 폴더에 system.log 이름으로 저장
            zippedArchive: true, // 압축여부
            format: winston.format.printf(
                info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}, ${info.line}] - ${info.message}`)
        }),
        // 콘솔 출력
        new winston.transports.Console({
            format: winston.format.printf(
                info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
        })
    ]
});

logger_rest.info = function(req, message){
    var remote_ip;

    if (req == ''){
        logger.info(message);    
    }else{
        remote_ip = require('./get_ip');
        remote_ip = remote_ip.get_ip(req);
        logger.info("[" + remote_ip + "] - (" + message + ")");
    }
}

logger_rest.error = function(req, message){
    var remote_ip;

    if (req == ''){
        logger.error(message);    
    }else{
        remote_ip = require('./get_ip');
        remote_ip = remote_ip.get_ip(req);
        logger.error("[" + remote_ip + "] - (" + message + ")");
    }
}

logger_rest.debug = function(req, message){
    var remote_ip;

    if (req == ''){
        logger.debug(message);    
    }else{
        remote_ip = require('./get_ip');
        remote_ip = remote_ip.get_ip(req);
        logger.debug("[" + remote_ip + "] - (" + message + ")");
    }
}
 
module.exports = logger_rest;