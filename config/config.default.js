"use strict"
/**
 * @file config.default.js
 * @desc 全局项目配置
 */
const path = require("path")


/** 
 * 数据库配置
 */
exports.mysql = {
    host: "192.168.8.139",
    user: "root",
    port: 3306,
    db: "koa",
    passwd: "scut2019",
}
/** 
 * 静态文件配置
 * @param path {string} 静态文件所在目录
 */
exports.static = {
    path: path.resolve(__dirname, "../static")
}
/**
 * api version
 */
exports.apiVersion = "/api/v1"