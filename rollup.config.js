import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const path = require("path");
const ROOT_PATH = path.resolve(__dirname);

export default [
    {
        input: path.resolve(ROOT_PATH, "./build/es6/index.js"),
        output: {
            format: "iife",
            file: path.resolve(ROOT_PATH, "./build/web/h5LogUtils.js"),
            name: "LogUtils" //导出文件js对象
        },

        plugins: [
            //第三方库没有正确加载，需要引用
            resolve(),
            //node模块使用的CommonJs,它不会被Rollup兼容，因此不能直接被使用。所以引入rollup-plugin-commonjs插件。
            commonjs(),
            babel({
                exclude: "node_modules/**",
                runtimeHelpers: true
            }),
            uglify()
        ]
    }
];
