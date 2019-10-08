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

// 参考文档: https://sequelize.org/master/manual/getting-started.html#installing
const sequelize = new Sequelize(db, user, passwd, {
    host: host,
    dialect: 'mysql',
    dialectOptions: {connectTimeout: 1000},
    define: {
        timestamps: false // Model中默认添加createdAt, updatedAt字段, 设为false不添加这两个字段
    },
    timezone: "+08:00"
    // timezone: "Asia/Shanghai"
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
