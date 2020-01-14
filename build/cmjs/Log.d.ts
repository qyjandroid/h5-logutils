export interface LogOptions {
    enabled: boolean;
    useColors: boolean;
    isNodeEnv: boolean;
}
export declare enum LogLevel {
    LOG = 1,
    DEBUG = 2,
    INFO = 3,
    WARN = 4,
    ERROR = 5
}
export default class Log {
    private name;
    private enabled;
    private useColors;
    private isNodeEnv;
    constructor(name: any, options: LogOptions);
    getName: () => string;
    setEnabled: (skips: RegExp[], names: RegExp[]) => void;
    log: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    checkOutLog: (logLevel: any) => boolean;
    formatArgs: (logType: LogLevel, args: any[]) => void;
    coerce: (val: string | Error) => string;
}
