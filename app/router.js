"use strict"
const router = require("koa-router")()
const user = require("./controllers/user")

/**
 * 定义API路由
 */
router.get("/", (ctx) => {
    ctx.body = "hi, koa"
})
/**
 * 实现用户模块的增删改查操作
 */
router.post("/user", user.create)
router.get("/user", user.index)
router.put("/user/:id", user.edit)
router.get("/user/:id", user.show)
router.delete("/user/:id", user.destory)

module.exports = router
