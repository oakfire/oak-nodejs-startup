"use strict";

let winston = require('winston');
let moment = require('moment');

const config = require('./config');
let log_dir = config.log_dir;
if (!log_dir) {
    log_dir = require('path').dirname(__dirname) + '/logs';
}

require('mkdirp').sync(log_dir);

let loggers = {};

let log_level = config.log_level || 'debug';

process.on('SIGUSR2', function() {
    console.log('Got SIGUSR2');
    console.log('Current log_level is: ' + log_level);
    console.log('Config log_level is: ' + config.log_level);

    if(log_level !== 'debug') {
        console.log('Set log_level to: debug');
        log_level = 'debug';
        for( let child in loggers ) {
            loggers[child].warn('Set log_level to: debug');
            loggers[child].transports.console.level = log_level;
            loggers[child].transports.file.level = log_level;
        }
    }else {
        console.log('Set log_level to config_log_level: ' + config.log_level);
        log_level = config.log_level;
        for( let child in loggers ) {
            loggers[child].warn('Set log_level to config_log_level: ', config.log_level);
            loggers[child].transports.console.level = log_level;
            loggers[child].transports.file.level = log_level;
        }
    }
});

const TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

module.exports = function(type) {

    if (!loggers[type]) {

        const log_file = log_dir + '/' + type + '.log';

        let logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    level: log_level || 'debug',
                    colorize: true,
                    timestamp: function() { return moment().format(TIME_FORMAT); },
                    /** 生产环境需要 silent: true */
                    silent: config.console_quiet
                }),
                new (winston.transports.File)({
                    json: false,
                    level: log_level || 'debug',
                    timestamp: function() { return moment().format(TIME_FORMAT); },
                    filename: log_file
                })
            ]
        });

        loggers[type] = logger;
    }

    return loggers[type];

};
