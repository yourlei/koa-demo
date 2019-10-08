const Koa = require("koa")
const Router = require("koa-router")
const koaStatic = require("koa-static")
const bodyParse = require("koa-bodyparser")
const router = require("./app/router")
const Sequelize = require("sequelize")
const models = require("./app/model")
const extend = require("./app/extend/context")
const config = require("./config/config.default")
const {
    host,
    user,
    db,
    passwd,
    port
} = config.mysql

const sequelize = new Sequelize(`mysql://${user}:${passwd}@${host}:${port}/${db}`, {
    define: {
      // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
      // 该值默认为 true, 但是当前设定为 false
      timestamps: false
    }
})
const app = new Koa()
// bodyparse
app.use(bodyParse())
// koa-static
app.use(koaStatic(config.static.path))
// router
app.use(router.routes())

sequelize
  .authenticate()
  .then(() => {
    console.log('数据库连接成功.')
  })
  .catch(err => {
    console.error('数据库连接失败:', err)
  });

// 模型映射到数据库表
Object.keys(models).forEach(name => {
    sequelize.define(`${name}`, models[name])
})
// sequelize model挂载到app#context
app.context.model = sequelize.models
// context validate
app.context.validate = extend.validate
app.context.outputJson = extend.outputJson
app.context.parseHttpPayload = extend.parseHttpPayload

app.listen("8080", () => {
    console.log("server is running...")
})

module.exports = app
