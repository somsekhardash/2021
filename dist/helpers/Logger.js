"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};
var level = function () {
    var env = process.env.NODE_ENV || "development";
    var isDevelopment = env === "development";
    return isDevelopment ? "debug" : "warn";
};
var colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};
winston.addColors(colors);
var format = winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston.format.colorize({ all: true }), winston.format.printf(function (info) { return info.timestamp + " " + info.level + ": " + info.message; }));
var transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
    new winston.transports.File({ filename: "logs/all.log" }),
];
var Logger = winston.createLogger({
    level: level(),
    levels: levels,
    format: format,
    transports: transports,
});
exports.default = Logger;
//# sourceMappingURL=Logger.js.map