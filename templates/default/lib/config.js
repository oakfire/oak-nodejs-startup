"use strict";
const json = __dirname + "/../config/" + (process.env.NODE_ENV || "default") + ".js";
const Config = require(json);

module.exports = Config;
