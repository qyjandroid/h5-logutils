import { LogLeve_ENUM } from "./LogLevel";
export interface LogOptions {
    enabled: boolean;
    useColors: boolean;
    isNodeEnv: boolean;
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
    formatArgs: (logType: LogLeve_ENUM, args: any[]) => void;
    coerce: (val: string | Error) => string;
}
