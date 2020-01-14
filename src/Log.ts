/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/*
 * @Author: quanyj
 * @Date: 2020-01-07 17:38:14
 * @Last Modified by: quanyj
 * @Last Modified time: 2020-01-14 15:18:50
 */
export interface LogOptions {
    /**
     *
     * 开启
     * @type {boolean}
     * @memberof LogOptions
     */
    enabled: boolean;
    /**
     *
     * 是否可以使用颜色
     * @type {boolean}
     * @memberof LogOptions
     */
    useColors: boolean;

    /**
     *
     * 是否node环境
     * @type {boolean}
     * @memberof LogOptions
     */
    isNodeEnv: boolean;
}

export enum LogLevel {
    LOG = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5
}

const colors = {
    1: "#00CCB1",
    2: "#0099FF",
    3: "#0092CC",
    4: "#4EF564",
    5: "#E71710"
};

export default class Log {
    private name: string;

    private enabled: boolean;

    private useColors: boolean;

    private isNodeEnv: boolean;

    constructor(name, options: LogOptions) {
        this.name = name;
        this.enabled = options.enabled || true;
        this.useColors = options.useColors;
        this.isNodeEnv = options.isNodeEnv;
    }

    /**
     *
     * 获取log实例的名称
     * @memberof Log
     */
    getName = () => this.name;


    /**
     *
     * 设置是否开启,私有方法
     * @memberof Log
     */
    setEnabled = (skips: RegExp[], names: RegExp[]) => {
        if (this.name[this.name.length - 1] === '*') {
            this.enabled = true;
            return;
        }
        let enabled = false;
        let i;
        let len;

        for (i = 0, len = skips.length; i < len; i += 1) {
            if (skips[i].test(this.name)) {
                enabled = false;
            }
        }

        for (i = 0, len = names.length; i < len; i += 1) {
            if (names[i].test(this.name)) {
                enabled = true;
            }
        }

        this.enabled = enabled;
    }

    log = (...args: any[]) => {
        const flag = this.checkOutLog(LogLevel.LOG);
        if (flag) {
            this.formatArgs(LogLevel.LOG, args);
            console.log(...args);
        }
    }

    debug = (...args: any[]) => {
        const flag = this.checkOutLog(LogLevel.DEBUG);
        if (flag) {
            this.formatArgs(LogLevel.DEBUG, args);
            console.debug(...args);
        }
    }

    info = (...args: any[]) => {
        const flag = this.checkOutLog(LogLevel.INFO);
        if (flag) {
            this.formatArgs(LogLevel.INFO, args);
            console.info(...args);
        }
    }

    warn = (...args: any[]) => {
        const flag = this.checkOutLog(LogLevel.WARN);
        if (flag) {
            this.formatArgs(LogLevel.WARN, args);
            console.warn(...args);
        }
    }

    error = (...args: any[]) => {
        const flag = this.checkOutLog(LogLevel.ERROR);
        if (flag) {
            this.formatArgs(LogLevel.ERROR, args);
            console.error(...args);
        }
    }

    checkOutLog = (logLevel: any) => {
        //LOG_LEVEL ||
        if (logLevel >= LogLevel[(window as any).LOG_LEVEL || "LOG"] && this.enabled) {
            return true;
        }
        return false;
    }

    formatArgs = (logType: LogLevel, args: any[]) => {
        args[0] = this.coerce(args[0]);

        if (typeof args[0] !== 'string') {
            // Anything else let's inspect with %O
            args.unshift('%O');
        }

        args[0] = `${(this.useColors ? '%c' : '')
            + this.name
            + (this.useColors ? ' %c' : ' ')
            + args[0]}`;

        if (!this.useColors) {
            return;
        }
        const c = `color: ${colors[logType]}`;
        args.splice(1, 0, c, 'color: inherit');
    }


    coerce = (val: Error | string) => {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
}
