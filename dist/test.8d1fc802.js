// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"build/cmjs/LogLevel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LogLeve_ENUM;

(function (LogLeve_ENUM) {
  LogLeve_ENUM[LogLeve_ENUM["LOG"] = 1] = "LOG";
  LogLeve_ENUM[LogLeve_ENUM["DEBUG"] = 2] = "DEBUG";
  LogLeve_ENUM[LogLeve_ENUM["INFO"] = 3] = "INFO";
  LogLeve_ENUM[LogLeve_ENUM["WARN"] = 4] = "WARN";
  LogLeve_ENUM[LogLeve_ENUM["ERROR"] = 5] = "ERROR";
})(LogLeve_ENUM = exports.LogLeve_ENUM || (exports.LogLeve_ENUM = {}));

var curLevel = LogLeve_ENUM.LOG;

var LogLevel = function () {
  function LogLevel() {}

  LogLevel.setLogLevel = function (level) {
    curLevel = level;
  };

  LogLevel.getLogLevel = function () {
    return curLevel;
  };

  return LogLevel;
}();

exports.default = LogLevel;
},{}],"build/cmjs/Log.js":[function(require,module,exports) {
"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var LogLevel_1 = __importStar(require("./LogLevel"));

var colors = {
  1: "#00CCB1",
  2: "#0099FF",
  3: "#0092CC",
  4: "#4EF564",
  5: "#E71710"
};

var Log = function () {
  function Log(name, options) {
    var _this = this;

    this.getName = function () {
      return _this.name;
    };

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

      args[0] = "" + ((_this.useColors ? '%c' : '') + _this.name + (_this.useColors ? ' %c' : ' ') + args[0]);

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
}();

exports.default = Log;
},{"./LogLevel":"build/cmjs/LogLevel.js"}],"build/cmjs/index.js":[function(require,module,exports) {
"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Log_1 = __importDefault(require("./Log"));

var LogLevel_1 = __importStar(require("./LogLevel"));

var LogUtil = function () {
  function LogUtil() {
    var _this = this;

    this.instances = {};
    this.defaultLogOption = {
      enabled: true,
      useColors: false,
      isNodeEnv: false
    };

    this.setLogLevel = function (logLevel) {
      LogLevel_1.default.setLogLevel(logLevel);
    };

    this.getAllLogLevel = function () {
      return LogLevel_1.LogLeve_ENUM;
    };

    this.checkIsNode = function () {
      return false;
    };

    this.useColors = function () {
      if (_this.checkIsNode()) return false;

      if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
        return true;
      }

      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }

      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    };

    this.create = function (namespaces, LogOptions) {
      if (LogOptions === void 0) {
        LogOptions = {};
      }

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
        } else {
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

    LogLevel_1.default.setLogLevel(LogLevel_1.LogLeve_ENUM.LOG);
    this.defaultLogOption.useColors = this.useColors();
    this.defaultLogOption.isNodeEnv = this.checkIsNode();
  }

  return LogUtil;
}();

var LogUtils = new LogUtil();
exports.default = LogUtils;
},{"./Log":"build/cmjs/Log.js","./LogLevel":"build/cmjs/LogLevel.js"}],"test.ts":[function(require,module,exports) {
var LogUtils = require("./build/cmjs").default;

console.log(LogUtils);
var logLevelEnum = LogUtils.getAllLogLevel();
console.log(logLevelEnum);
LogUtils.setLogLevel(logLevelEnum.WARN);
var app1 = LogUtils.create("app:1");
app1.log("log");
app1.debug("debug");
app1.info("info");
app1.warn("warn");
app1.error("error");
},{"./build/cmjs":"build/cmjs/index.js"}],"C:/Users/quanyj/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59650" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/quanyj/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","test.ts"], null)
//# sourceMappingURL=/test.8d1fc802.js.map