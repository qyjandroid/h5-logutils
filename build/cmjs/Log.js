"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel_1 = __importStar(require("./LogLevel"));
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
            var flag = _this.checkOutLog(LogLevel_1.LogLeve_ENUM.LOG);
            if (flag) {
                _this.formatArgs(LogLevel_1.LogLeve_ENUM.LOG, args);
                console.log.apply(console, args);
            }
        };
        this.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel_1.LogLeve_ENUM.DEBUG);
            if (flag) {
                _this.formatArgs(LogLevel_1.LogLeve_ENUM.DEBUG, args);
                console.debug.apply(console, args);
            }
        };
        this.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel_1.LogLeve_ENUM.INFO);
            if (flag) {
                _this.formatArgs(LogLevel_1.LogLeve_ENUM.INFO, args);
                console.info.apply(console, args);
            }
        };
        this.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel_1.LogLeve_ENUM.WARN);
            if (flag) {
                _this.formatArgs(LogLevel_1.LogLeve_ENUM.WARN, args);
                console.warn.apply(console, args);
            }
        };
        this.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var flag = _this.checkOutLog(LogLevel_1.LogLeve_ENUM.ERROR);
            if (flag) {
                _this.formatArgs(LogLevel_1.LogLeve_ENUM.ERROR, args);
                console.error.apply(console, args);
            }
        };
        this.checkOutLog = function (logLevel) {
            var curGlobalLevel = LogLevel_1.default.getLogLevel();
            if (logLevel >= curGlobalLevel && _this.enabled) {
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
