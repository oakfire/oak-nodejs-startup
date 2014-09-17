var winston = require('winston'),
    moment = require('moment');

var config = require('./config'),
    log_dir = config.log_dir;

if (!log_dir) {
    log_dir = require('path').dirname(__dirname) + '/logs';
}

require('mkdirp').sync(log_dir);

var loggers = {};

var log_level = config.log_level || 'debug';

process.on('SIGUSR2', function() {
    console.log('Got SIGUSR2');
    console.log('Current log_level is: ' + log_level);
    console.log('Config log_level is: ' + config.log_level);

    if(log_level !== 'debug') {
        console.log('Set log_level to: debug');
        log_level = 'debug';
        for( var child in loggers ) {
            loggers[child].transports.console.level = log_level;
            loggers[child].transports.file.level = log_level;
        }
    }else {
        console.log('Set log_level to config_log_level: ' + config.log_level);
        log_level = config.log_level;
        for( var child in loggers ) {
            loggers[child].transports.console.level = log_level;
            loggers[child].transports.file.level = log_level;
        }
    }
});

module.exports = function(type) {

    if (!loggers[type]) {

        var log_file = log_dir + '/' + type + '.log';

        var logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)({
                    level: log_level || 'debug',
                    colorize: true,
                    timestamp: function() { return moment().format(); },
                    /** 生产环境需要 silent: true */
                    silent: config.console_quiet
                }),
                new (winston.transports.File)({
                    json: false,
                    level: log_level || 'debug',
                    timestamp: function() { return moment().format(); },
                    filename: log_file
                })
            ]
        });

        loggers[type] = logger;
    }

    return loggers[type];

};
