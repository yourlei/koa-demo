"use strict"
/**
 * @desc 用户管理模块
 * @author leiyu
 */
const UserService = require("../service/user")
const errCode = require("../utils/errMap").errCode
 /**
  * @class UserCtrl
  * @desc 用户管理控制层
  */
 class UserCtrl {
    /**
     * @desc 创建用户
     * @param {App#context} ctx  
     * @param {*} next 
     */
    static async create(ctx, next) {
        const body = ctx.request.body
        // 接受的body参数
        const rules = {
            name: {"type": "string", required: true, minLength: 1},
            email: {"type": "email", required: true},
            mobile: {"type": "string", required: true, minLength: 10},
        }
        const validateInfo = ctx.validate(rules, body)
        if (validateInfo.code) {
            ctx.body = validateInfo
            return 
        }
        const flag = await UserService.create(ctx, body)
        const code = flag ? 0 : errCode["exist_mobile_email"]
        ctx.body = ctx.outputJson(code)
    }
    /**
     * 查询用户列表
     * @param {App#context} ctx 
     * @param {*} next 
     */
    static async index(ctx, next) {
        const query = Object.assign({}, ctx.request.query)
        const rules = {
            offset: {type: "string", required: true},
            limit: {type: "string", required: true},
            name: {type: "string"}
        }
        console.log(query, "=====")
        const validateInfo = ctx.validate(rules, query)
        if (validateInfo.code) {
            ctx.body = validateInfo
            return 
        }
        const result = await UserService.index(ctx, query)
        
        ctx.body = ctx.outputJson(code, msg, result)
    }
 }

 module.exports = UserCtrl