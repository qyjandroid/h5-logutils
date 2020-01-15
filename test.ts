import LogUtils from "./build/es6"   // ES6

const logLevelEnum = LogUtils.getAllLogLevel();
console.log(logLevelEnum)
//2.设置筛选的log等级
LogUtils.setLogLevel(logLevelEnum.WARN);
//创建app1 log对象
const app1 = LogUtils.create("app:1");
//3.打印 log 等级日志
app1.log("log");
app1.debug("debug");
app1.info("info");
app1.warn("warn");
app1.error("error");