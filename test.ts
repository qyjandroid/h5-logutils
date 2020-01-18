// import LogUtils from "./build/es6"   // ES6
// const { LogUtils, LogLevel } = require("./build/cmjs").default; // commonjs
// console.log("LogUtils==", LogUtils, "===hhh==", LogLevel)

import LogUtils from "./build/es6/index";
const logLevelEnum = LogUtils.getAllLogLevel();

//2.设置筛选的log等级
LogUtils.setLogLevel(logLevelEnum.INFO);
LogUtils.enable("-*");
//创建app1 log对象
const app1 = LogUtils.create("app:1");
//3.打印 log 等级日志
app1.log("log");
app1.debug("debug");
app1.info("info");
app1.warn("warn");
app1.error("error");

const app2 = LogUtils.create("app:2");
//3.打印 log 等级日志
app2.log("log");
app2.debug("debug");
app2.info("info");
app2.warn("warn");
app2.error("error");

const aa2 = LogUtils.create("aa");
aa2.log("log");
aa2.debug("debug");
aa2.info("info");
aa2.warn("warn");
aa2.error("error");