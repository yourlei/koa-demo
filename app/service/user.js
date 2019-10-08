"use strict"
/**
 * 用户管理
 */
const Op = require("sequelize").Op
const ctx = require("../../server")
/**
 * @name UserService
 * @desc 处理用户模块的业务逻辑
 */
class UserService {
    /**
     * @param {App#context} ctx, koa应用上下文对象
     * @param {object} user
     * @member {string} name, 用户名
     * @member {string} email, 用户邮箱(唯一)
     * @member {string} mobile, 手机号(唯一)
     * 
     * @return bool, true: 创建成功, false: 邮箱或手机号已占用
     */
    static async create(ctx, user) {
        const {
            email,
            mobile
        } = user
        
        const newOrExit = await ctx.model.user.findOrCreate({
            where: {
                [Op.or]: [
                    {email: email},
                    {mobile: mobile}
                ]
            },
            defaults: {
                ...user
            }
        }).then( data => {
            // true: 创建成功
            // false: 数据已存在
            return data[1]
        })

        return newOrExit
    }
    /**
     * 查询用户列表
     * @param {*} ctx 
     * @param {object} params
     */
    static async index(ctx, params) {
        const {
            limit,
            offset,
            name
        } = params

        const rows = await ctx.model.user.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },
            offset,
            limit,
        }).then( data => {
            console.log(data)
            return data
        })
        
        return rows
    }
}

module.exports = UserService