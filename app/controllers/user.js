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
        // const body = ctx.request.body
        // 接受的body参数
        const rules = {
            name: {"type": "string", required: true, minLength: 1},
            email: {"type": "email", required: true},
            mobile: {"type": "string", required: true, minLength: 10},
        }
        const payload = ctx.parseHttpPayload(ctx, rules)
        if (payload.code) {
            return payload
        }
        // flag: bool type, if user mobile or email had existed,return false, else true
        const flag = await UserService.create(ctx, payload.data)
        const code = flag ? 0 : errCode["exist_mobile_email"]
        ctx.body = ctx.outputJson(code)
    }
    /**
     * 查询用户列表
     * @param {App#context} ctx 
     * @param {*} next 
     */
    static async index(ctx, next) {
        const rules = {
            offset: {type: "number", required: true},
            limit: {type: "number", required: true},
            name: {type: "string"},
            email: {type: "string"}
        }

        const payload = ctx.parseHttpPayload(ctx, rules)
        if (payload.code) {
            ctx.body = payload
            return 
        }
        const result = await UserService.index(ctx, payload.data)
        
        ctx.body = ctx.outputJson(0, "", result)
    }
 }

 module.exports = UserCtrl