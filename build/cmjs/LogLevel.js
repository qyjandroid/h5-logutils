"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLeve_ENUM;
(function (LogLeve_ENUM) {
    LogLeve_ENUM[LogLeve_ENUM["LOG"] = 1] = "LOG";
    LogLeve_ENUM[LogLeve_ENUM["DEBUG"] = 2] = "DEBUG";
    LogLeve_ENUM[LogLeve_ENUM["INFO"] = 3] = "INFO";
    LogLeve_ENUM[LogLeve_ENUM["WARN"] = 4] = "WARN";
    LogLeve_ENUM[LogLeve_ENUM["ERROR"] = 5] = "ERROR";
})(LogLeve_ENUM = exports.LogLeve_ENUM || (exports.LogLeve_ENUM = {}));
var curLevel = LogLeve_ENUM.LOG;
var LogLevel = (function () {
    function LogLevel() {
    }
    LogLevel.setLogLevel = function (level) {
        curLevel = level;
    };
    LogLevel.getLogLevel = function () {
        return curLevel;
    };
    return LogLevel;
}());
exports.default = LogLevel;
