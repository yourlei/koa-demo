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
        const rows = await ctx.model.user.findAll()
        console.log(rows, "....")
        ctx.body = "hello koa"
    }
 }

 module.exports = UserCtrl