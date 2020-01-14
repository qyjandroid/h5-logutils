import Log from "./Log";

/*
 * @Author: quanyj
 * @Date: 2020-01-07 17:32:37
 * @Last Modified by: quanyj
 * @Last Modified time: 2020-01-14 15:03:47
 */


class LogUtil {
    private instances: { [key: string]: Log } = {};

    private defaultLogOption = { enabled: true, useColors: false, isNodeEnv: false };


    constructor() {
        // 初始化是否可以使用颜色
        this.defaultLogOption.useColors = this.useColors();
        // 初始化是否node环境
        this.defaultLogOption.isNodeEnv = this.checkIsNode();
        console.log("执行")
    }

    checkIsNode = () => {
        // if (typeof process === 'undefined' || (process as any).type === 'renderer' || (process as any).browser === true || (process as any).__nwjs) {
        //     return false;
        // }
        return false;
    }

    /**
     *
     * 是否可以使用颜色
     * @memberof LogUtil
     */
    useColors = () => {
        // 如果 node 环境,不使用颜色
        if (this.checkIsNode()) return false;
        // NB: In an Electron preload script, document will be defined but not fully
        // initialized. Since we know we're in Chrome, we'll just detect this case
        // explicitly
        if (typeof window !== 'undefined' && (window as any).process && ((window as any).process.type === 'renderer' || (window as any).process.__nwjs)) {
            return true;
        }

        // Internet Explorer and Edge do not support colors.
        if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
            return false;
        }

        // Is webkit? http://stackoverflow.com/a/16459606/376773
        // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
        return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && (document.documentElement.style as any).WebkitAppearance)
            // Is firebug? http://stackoverflow.com/a/398120/376773
            || (typeof window !== 'undefined' && window.console && ((window.console as any).firebug || (window.console.exception && window.console.table)))
            // Is firefox >= v31?
            // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
            || (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31)
            // Double check webkit in userAgent just in case we are in a worker
            || (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
    }

    /**
     *
     * 创建log实例
     * @memberof LogUtil
     */
    create = (namespaces: string, LogOptions = {}): Log | null => {
        if (!namespaces) {
            return null;
        }
        let instance = this.instances[namespaces];
        if (instance) {
            return instance;
        }
        instance = new Log(namespaces, { ...this.defaultLogOption, ...LogOptions });
        this.instances[namespaces] = instance;
        return instance;
    }

    /**
     *  过滤条件
     *  worker:* 可以直接查看worker:a以及worker:b等
     * "workera,workerb,-workerc" 可以查看workera和workerb,排除workerc
     * @memberof LogUtil
     */
    enable = (namespaces: string) => {
        let i: number;
        const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
        const len = split.length;
        const skips = [];
        const names = [];
        for (i = 0; i < len; i += 1) {
            if (!split[i]) {
                // ignore empty strings
                continue;
            }
            const newNamespaces = split[i].replace(/\*/g, '.*?');
            if (newNamespaces[0] === '-') {
                skips.push(new RegExp(`^${newNamespaces.substr(1)}$`));
            } else {
                names.push(new RegExp(`^${newNamespaces}$`));
            }
        }
        const keys = Object.keys(this.instances);
        for (i = 0; i < keys.length; i += 1) {
            const namespacesItem = keys[i];
            const instance = this.instances[namespacesItem];
            instance.setEnabled(skips, names);
        }
    }

    destroy = (namespaces: string) => {
        const instance = this.instances[namespaces];
        if (instance) {
            delete this.instances[namespaces];
        }
    }
}


const LogUtils = new LogUtil();

export default LogUtils;
