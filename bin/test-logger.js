#!/usr/bin/env node
var logger = require('../lib/logger')('test-logger');
var config = require('../lib/config');

var count = 1;

setInterval(function() {
    logger.debug(count);
    logger.info(count);
    count += 1;
}, 1000);
