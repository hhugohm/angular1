'use strict';

var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
    transports: [
      new winston.transports.File({
          timestamp: true,
           level: 'debug',
           filename: './log/neossoftware_back.log',
           handleExceptions: true,
           json: true,
           maxsize: 5242880, //5MB
           maxFiles: 5,
           colorize: false,
       }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true,
            stderrLevels:['error', 'debug', 'info']
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
