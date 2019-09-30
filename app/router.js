"use strict"
const router = require("koa-router")()
const user = require("./controllers/user")

/**
 * 定义项目api
 */
router.get("/", (ctx) => {
    ctx.body = "hi, koa"
})

router.post("/user", user.create)
router.get("/user", user.index)

module.exports = router
