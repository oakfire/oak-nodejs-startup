var json = __dirname + "/../config/" + (process.env.NODE_ENV || "default") + ".json";
var Config = require(json);

module.exports = Config;
