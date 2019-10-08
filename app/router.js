"use strict"
const router = require("koa-router")()
const user = require("./controllers/user")
const apiVersion = require("../config/config.default").apiVersion

/**
 * 定义API路由
 */
router.get("/", (ctx) => {
    ctx.body = "hi, koa"
})
/**
 * 用户模块增删改查路由
 */
router.post(`${apiVersion}/user`, user.create)
router.get(`${apiVersion}/user`, user.index)
router.put(`${apiVersion}/user/:id`, user.edit)
router.get(`${apiVersion}/user/:id`, user.show)
router.delete(`${apiVersion}/user/:id`, user.destory)

module.exports = router
