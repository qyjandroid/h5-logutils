"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["LOG"] = 1] = "LOG";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["WARN"] = 4] = "WARN";
    LogLevel[LogLevel["ERROR"] = 5] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var colors = {
    1: "#00CCB1",
    2: "#0099FF",
    3: "#0092CC",
    4: "#4EF564",
    5: "#E71710"
};
var Log = (function () {
    function Log(name, options) {
        var _this = this;
        this.getName = function () { return _this.name; };
        this.setEnabled = function (skips, names) {
            if (_this.name[_this.name.length - 1] === '*') {
                _this.enabled = true;
                return;
            }
            var enabled = false;
            var i;
            var len;
            for (i = 0, len = skips.length; i < len; i += 1) {
                if (skips[i].test(_this.name)) {
                    enabled = false;
                }
            }
            for (i = 0, len = names.length; i < len; i += 1) {
                if (names[i].test(_this.name)) {
                    enabled = true;
                }
            }
            _this.enabled = enabled;
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel.LOG);
            if (flag) {
                _this.formatArgs(LogLevel.LOG, args);
                console.log.apply(console, args);
            }
        };
        this.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel.DEBUG);
            if (flag) {
                _this.formatArgs(LogLevel.DEBUG, args);
                console.debug.apply(console, args);
            }
        };
        this.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel.INFO);
            if (flag) {
                _this.formatArgs(LogLevel.INFO, args);
                console.info.apply(console, args);
            }
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel.WARN);
            if (flag) {
                _this.formatArgs(LogLevel.WARN, args);
                console.warn.apply(console, args);
            }
        };
        this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel.ERROR);
            if (flag) {
                _this.formatArgs(LogLevel.ERROR, args);
                console.error.apply(console, args);
            }
        };
        this.checkOutLog = function (logLevel) {
            if (logLevel >= LogLevel[window.LOG_LEVEL || "LOG"] && _this.enabled) {
                return true;
            }
            return false;
        };
        this.formatArgs = function (logType, args) {
            args[0] = _this.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                args.unshift('%O');
            }
            args[0] = "" + ((_this.useColors ? '%c' : '')
                + _this.name
                + (_this.useColors ? ' %c' : ' ')
                + args[0]);
            if (!_this.useColors) {
                return;
            }
            var c = "color: " + colors[logType];
            args.splice(1, 0, c, 'color: inherit');
        };
        this.coerce = function (val) {
            if (val instanceof Error) {
                return val.stack || val.message;
            }
            return val;
        };
        this.name = name;
        this.enabled = options.enabled || true;
        this.useColors = options.useColors;
        this.isNodeEnv = options.isNodeEnv;
    }
    return Log;
}());
exports.default = Log;
