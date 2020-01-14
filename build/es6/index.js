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
import Log from "./Log";
import LogLevel, { LogLeve_ENUM } from "./LogLevel";
var LogUtil = (function () {
    function LogUtil() {
        var _this = this;
        this.instances = {};
        this.defaultLogOption = { enabled: true, useColors: false, isNodeEnv: false };
        this.setLogLevel = function (logLevel) {
            LogLevel.setLogLevel(logLevel);
        };
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
            instance = new Log(namespaces, __assign(__assign({}, _this.defaultLogOption), LogOptions));
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
        LogLevel.setLogLevel(LogLeve_ENUM.LOG);
        this.defaultLogOption.useColors = this.useColors();
        this.defaultLogOption.isNodeEnv = this.checkIsNode();
    }
    return LogUtil;
}());
var LogUtils = new LogUtil();
export default LogUtils;
