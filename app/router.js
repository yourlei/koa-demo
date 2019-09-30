const router = require("koa-router")()
const user = require("./controllers/user")


router.get("/", (ctx) => {
    ctx.body = "hi, koa"
})

// console.log(user.create(), "....")
router.post("/user", user.create)

module.exports = router
