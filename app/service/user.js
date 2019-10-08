"use strict"
/**
 * 用户管理
 */
const moment = require("moment")
const Op = require("sequelize").Op
const utils = require("../utils/utils")
const errCode = require("../utils/errMap").errCode
/**
 * @name UserService
 * @desc 处理用户模块的业务逻辑
 */
class UserService {
    /**
     * @desc 创建用户
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
                ],
                deleted_at: utils.deletedAt
            },
            defaults: {
                ...user,
            }
        }).then( data => {
            // true: 创建成功
            // false: 数据已存在
            return data[1]
        })

        const code = newOrExit ? 0 : errCode["EXIST_MOBILE_EMAIL"]
        
        return ctx.outputJson(code)
    }
    /**
     * @desc 查询用户列表
     * @param {Application#context} ctx 
     * @param {object} params
     * 
     * @return array
     */
    static async index(ctx, params) {
        const {
            limit,
            offset,
            name
        } = params
        // 封装查询条件到where对象
        let where = {
            deleted_at: utils.deletedAt
        }
        // 用户名模糊查询
        if (name) {
            Object.assign(where, {
                name: {
                    [Op.like]: `%${name}%`
                }
            })
        }
        const result = await ctx.model.user.findAndCountAll({
            where,
            offset,
            limit,
        })
        
        return result
    }
    /**
     * @desc 编辑用户信息
     * @param {Application#context} ctx
     * @param {string} id, 用户id
     * @param {object} params
     * @member {string} name, 用户名
     * @member {string} email, 邮箱
     * 
     * @return int
     */
    static async edit(ctx, id, params) {
        const {
            name,
            email
        } = params
        // 检查邮箱是否已占用
        if (email) {
            const hadUser = await ctx.model.user.findOne({
                where: {
                    id: {
                        [Op.ne]:  id,
                    },
                    [Op.or]: [
                        {
                            email: email
                        }
                    ],
                    deleted_at: utils.deletedAt
                }
            })
            // 邮箱已存在
            if (hadUser) {
                return errCode["EXIST_MOBILE_EMAIL"]
            }
        }
        // return [0|1], 执行更新: 1, 未执行更新: 0
        await ctx.model.user.update({
            ...params
        }, {
            where: {
                id: id
            }
        })

        return 0
    }
    /**
     * @desc 用户详情
     * @param {Application#context} ctx 
     * @param {string} id, 用户ID
     * 
     * @return object
     */
    static async show(ctx, id) {
        const user = await ctx.model.user.findByPk(id)

        if (!user) {
            let code = errCode["NOT_FOUND"]
            return ctx.outputJson(code)
        }

        return ctx.outputJson(0, "", user)
    }
    /**
     * @desc 删除用户
     * @param {Application#context} ctx 
     * @param {string} id, 用户ID
     */
    static async destory(ctx, id) {
        const row = await ctx.model.user.findByPk(id)

        if (!row) {
            let code = errCode["NOT_FOUND"]
            return ctx.outputJson(code)
        }
        
        await row.update({
            deleted_at: moment().format("YYYY-MM-DD HH:mm:ss")
        })
        
        return ctx.outputJson()
    }
}

module.exports = UserService