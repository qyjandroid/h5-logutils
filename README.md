# 欢迎使用 h5-logutils

**h5 日志工具类，可以控制日志输出以及方便的筛选日志，不同的等级使用不同的颜色值来区分，日志更加清晰**

## 安装

```bash
$ npm install h5-logutils -S
```

## 引用示例

#### 直接引用 build/web/h5LogUtils.js 压缩文件

```html
<body>
    <div>web测试日志</div>
    <script src="./build/web/h5LogUtils.js"></script>
    <script>
        //1.获取Log等级枚举对象。
        var logLevelEnum = window.LogUtils.getAllLogLevel();
        console.log(logLevelEnum);
        //2.设置筛选的log等级
        window.LogUtils.setLogLevel(logLevelEnum.WARN);
        //创建app1 log对象
        var app1 = window.LogUtils.create("app:1");
        //3.打印 log 等级日志
        app1.log("log");
        app1.debug("debug");
        app1.info("info");
        app1.warn("warn");
        app1.error("error");
    </script>
</body>
```

#### require 方式引入

```js
const LogUtils = require("h5-logutils").default; // commonjs
//1.获取Log等级枚举对象。
const logLevelEnum = LogUtils.getAllLogLevel();
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
```

#### import 方式引入

```js
import LogUtils from "h5-logutils"; // ES6
//1.获取Log等级枚举对象。
const logLevelEnum = LogUtils.getAllLogLevel();
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
```

## 用法

#### LogUtils 是一个日志模块工厂，允许您传入模块名称为不同的模块调试日志。

Example

app.js:

```js
import LogUtils from "h5-logutils"; // ES6
//1.获取全部log等级
const logLevelEnum = LogUtils.getAllLogLevel();
console.log(logLevelEnum);
//2.可以根据开发模式和生产模式，设置全局显示的log等级
LogUtils.setLogLevel(logLevelEnum.WARN);
```

a.js:

```js
import LogUtils from "h5-logutils"; // ES6
const logA = LogUtils.create("a");
logA.log("log");
logA.debug("debug");
logA.info("info");
logA.warn("warn");
logA.error("error");
```

b.js:

```js
import LogUtils from "h5-logutils"; // ES6
const logB = LogUtils.create("b");
logB.log("log");
logB.debug("debug");
logB.info("info");
logB.warn("warn");
logB.error("error");
```

#### LogUtils 允许您过滤日志。

Example

a.js:

```js
import LogUtils from "h5-logutils"; // ES6
var logA = LogUtils.create("worker:a");
logA.log("log");
logA.debug("debug");
logA.info("info");
logA.warn("warn");
logA.error("error");
```

b.js:

```js
import LogUtils from "h5-logutils"; // ES6
var logA = LogUtils.create("worker:b");
logA.log("log");
logA.debug("debug");
logA.info("info");
logA.warn("warn");
logA.error("error");
```

c.js:

```js
import LogUtils from "h5-logutils"; // ES6
var logB = LogUtils.create("c");
logB.log("log");
logB.debug("debug");
logB.info("info");
logB.warn("warn");
logB.error("error");
```

app.js:

```js
import LogUtils from "h5-logutils"; // ES6
//1:根据业务名称 worker 过滤日志
LogUtils.enable("worker:*");

//2:显示某些文件日志 "c,worker:a" 过滤日志（模块名称用逗号隔开）
LogUtils.enable("c,worker:a");

//2:排除筛选出来的某一模块的日志 "worker:*，-worker:b" 过滤日志,用逗号隔开( - 用来排除日志)
LogUtils.enable("worker:*，-worker:b");
```

#### LogUtils 允许您根据业务需求打印不同的等级日志。

Example

a.js:

```js
import LogUtils from "h5-logutils"; // ES6
var logA = LogUtils.create("worker:a");
// 打印 LOG 日志
logA.log("log");
// 打印 DEBUG 日志
logA.debug("debug");
//打印 INFO 日志
logA.info("info");
//打印 WARN 日志
logA.warn("warn");
//打印 ERROR 日志
logA.error("error");
```

## Authors

-   quanyj
