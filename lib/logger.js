var winston = require('winston'),
    moment = require('moment');

var config = require('./config'),
    log_dir = config.log_dir;

if (!log_dir) {
    log_dir = require('path').dirname(__dirname) + '/logs';
}

require('mkdirp').sync(log_dir);

var loggers = {};

module.exports = function(type) {

    if (!loggers[type]) {

        var log_file = log_dir + '/' + type + '.log';

        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    level: config.log_level || 'debug',
                    colorize: true,
                    timestamp: function() { return moment().format(); },
                    /** 生产环境需要 silent: true */
                    silent: config.console_quiet
                }),
                new (winston.transports.File)({
                    level: config.log_level || 'debug',
                    timestamp: function() { return moment().format(); },
                    filename: log_file
                })
            ]
        });

        loggers[type] = logger;
    }

    return loggers[type];

};
