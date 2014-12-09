#!/usr/bin/env node
var logger = require('../lib/logger')('oak-app');
var config = require('../lib/config');

logger.info('oak-app started, pid: ' + process.pid);

var http = require('http');
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Oak-app\n');
}).listen(config.default_port);

logger.info('oak-app running at port: '+config.default_port);
