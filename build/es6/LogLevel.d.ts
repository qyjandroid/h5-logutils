export declare enum LogLeve_ENUM {
    LOG = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5
}
export default class LogLevel {
    static setLogLevel: (level: LogLeve_ENUM) => void;
    static getLogLevel: () => LogLeve_ENUM;
}
