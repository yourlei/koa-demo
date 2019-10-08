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
        console.log("user create...")
        // body参数验证规则
        const rules = {
            name: {"type": "string", required: true, minLength: 1},
            email: {"type": "email", required: true},
            mobile: {"type": "string", required: true, minLength: 10},
        }
        const payload = ctx.parseHttpPayload(ctx, rules)
        if (payload.code) {
            return ctx.body = payload
        }
        // flag: bool type, if user mobile or email had existed,return false, else true
        ctx.body = await UserService.create(ctx, payload.data)
        
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
        
        ctx.body = ctx.outputJson(0, "", result.rows, result.count)
    }
    /**
     * @desc 编辑用户
     * @param {App#context} ctx 
     */
    static async edit(ctx, next) {
        const rules = {
            name: {type: "string"},
            email: {type: "string"}
        }
        const payload = ctx.parseHttpPayload(ctx, rules)
        if (payload.code) {
            ctx.body = payload
            return 
        }
        const code = await UserService.edit(ctx, ctx.params.id, payload.data)
        
        ctx.body = ctx.outputJson(code, "")
    }
    /**
     * @desc 用户详情
     * @param {App#context} ctx 
     */
    static async show(ctx, next) {
        ctx.body = await UserService.show(ctx, ctx.params.id)
    }
    /**
     * @desc 删除用户
     * @param {Application#context} ctx 
     * @param {*} next 
     */
    static async destory(ctx, next) {
        ctx.body = await UserService.destory(ctx, ctx.params.id)
    }
 }

 module.exports = UserCtrl