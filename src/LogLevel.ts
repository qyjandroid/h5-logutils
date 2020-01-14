/*
 * @Author: quanyj 
 * @Date: 2020-01-14 17:30:19 
 * @Last Modified by: quanyj
 * @Last Modified time: 2020-01-14 17:43:44
 */

export enum LogLeve_ENUM {
    LOG = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5
}
let curLevel = LogLeve_ENUM.LOG;


/**
 *
 * 全局日志等级
 * @export
 * @class LogLevel
 */
export default class LogLevel {

    static setLogLevel = (level: LogLeve_ENUM) => {
        curLevel = level;
    }

    static getLogLevel = () => {
        return curLevel;
    }

}
