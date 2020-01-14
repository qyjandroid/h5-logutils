import Log from "./Log";
declare class LogUtil {
    private instances;
    private defaultLogOption;
    constructor();
    checkIsNode: () => boolean;
    useColors: () => any;
    create: (namespaces: string, LogOptions?: {}) => Log;
    enable: (namespaces: string) => void;
    destroy: (namespaces: string) => void;
}
declare const LogUtils: LogUtil;
export default LogUtils;
