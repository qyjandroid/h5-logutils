import Log from "./Log";
import { LogLeve_ENUM } from "./LogLevel";
declare class LogUtil {
    private instances;
    private defaultLogOption;
    private logLevelInstance;
    constructor();
    setLogLevel: (logLevel: LogLeve_ENUM) => void;
    getAllLogLevel: () => typeof LogLeve_ENUM;
    checkIsNode: () => boolean;
    useColors: () => any;
    create: (namespaces: string, LogOptions?: {}) => Log;
    enable: (namespaces: string) => void;
    destroy: (namespaces: string) => void;
}
declare const LogUtils: LogUtil;
export default LogUtils;
