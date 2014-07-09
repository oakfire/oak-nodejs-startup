var json = __dirname + "/../config/" + (process.env.NODE_ENV || "default") + ".js";
var Config = require(json);

module.exports = Config;
