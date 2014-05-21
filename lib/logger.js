var log4js = require('log4js');

var config = require('./config')
, log_dir = config.log_dir;

var mkdirp = require('mkdirp');

var _ = require('lodash');


if (!log_dir) {
    log_dir = require('path').dirname(__dirname) + '/logs';
}

mkdirp.sync(log_dir);

// console log is loaded and added by default, so you won't normally need to do this
// log4js.loadAppender('console');
// log4js.addAppender(log4js.appenders.console());

log4js.loadAppender('file');

var loggers = {};

/**
 * 该模块 exports 指定的logger 供其他模块使用
 *
 * 记日志的规则:
 * 目前所有日志都写在同一文件, 按不同重要度, 主要使用 info 和 error 两级日志
 */
module.exports = function(type) {

    if (!loggers[type]) {

        var log_file = log_dir + '/' + type + '.log';

        // console.log(log_file);

        log4js.addAppender(log4js.appenders.file(log_file), type);

        var logger = log4js.getLogger(type);
        // 高于 INFO 等级的 log 才会记录
        logger.setLevel('TRACE');

        loggers[type] = logger;
    }

    return loggers[type];

};

/*

var all_trace_level = false;
process.on('SIGUSR2', function() {
    // SIGUSR2 可用来 toggle 所有 logger 的 level

    console.log('Got SIGUSR2.');

    all_trace_level = !all_trace_level;

    console.log('Set all logger to', all_trace_level ? 'TRACE' : 'INFO', 'level');

    _.forOwn(loggers, function(logger, type) {
        if (all_trace_level) {
            logger.setLevel('TRACE');
        }
        else {
            logger.setLevel('INFO');
        }
    });
});

*/
