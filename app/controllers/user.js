"use strict"
/**
 * @desc 用户管理模块
 * @author leiyu
 */

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
            name: {"type": "string"},
            email: {"type": "email", required: true},
            mobile: {"type": "string", required: true}
        }
        const validateInfo = ctx.validate(rules, body)
        if (validateInfo.code) {
            ctx.body = validateInfo
            return 
        }
        ctx.body = "hello koa"
    }
 }

 module.exports = UserCtrl