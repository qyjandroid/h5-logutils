(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.LogUtils = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = __importDefault(require("./Log"));
var LogUtil = (function () {
    function LogUtil() {
        var _this = this;
        this.instances = {};
        this.defaultLogOption = { enabled: true, useColors: false, isNodeEnv: false };
        this.checkIsNode = function () {
            return false;
        };
        this.useColors = function () {
            if (_this.checkIsNode())
                return false;
            if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
                return true;
            }
            if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
                return false;
            }
            return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance)
                || (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table)))
                || (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31)
                || (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
        };
        this.create = function (namespaces, LogOptions) {
            if (LogOptions === void 0) { LogOptions = {}; }
            if (!namespaces) {
                return null;
            }
            var instance = _this.instances[namespaces];
            if (instance) {
                return instance;
            }
            instance = new Log_1.default(namespaces, __assign(__assign({}, _this.defaultLogOption), LogOptions));
            _this.instances[namespaces] = instance;
            return instance;
        };
        this.enable = function (namespaces) {
            var i;
            var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
            var len = split.length;
            var skips = [];
            var names = [];
            for (i = 0; i < len; i += 1) {
                if (!split[i]) {
                    continue;
                }
                var newNamespaces = split[i].replace(/\*/g, '.*?');
                if (newNamespaces[0] === '-') {
                    skips.push(new RegExp("^" + newNamespaces.substr(1) + "$"));
                }
                else {
                    names.push(new RegExp("^" + newNamespaces + "$"));
                }
            }
            var keys = Object.keys(_this.instances);
            for (i = 0; i < keys.length; i += 1) {
                var namespacesItem = keys[i];
                var instance = _this.instances[namespacesItem];
                instance.setEnabled(skips, names);
            }
        };
        this.destroy = function (namespaces) {
            var instance = _this.instances[namespaces];
            if (instance) {
                delete _this.instances[namespaces];
            }
        };
        this.defaultLogOption.useColors = this.useColors();
        this.defaultLogOption.isNodeEnv = this.checkIsNode();
        console.log("执行");
    }
    return LogUtil;
}());
var LogUtils = new LogUtil();
exports.default = LogUtils;

},{"./Log":1}]},{},[2])(2)
});
