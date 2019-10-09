## Koa 学习Demo

基于 **[Koa](https://github.com/koajs/koa)** **[koa-router](https://github.com/ZijianHe/koa-router)** **[sequelize](https://github.com/sequelize/sequelize)** 构建的nodejs后台服务,主要实现了用户模块增删改查功能, 可作为Koajs学习的入门例子

## 目录结构

<pre>
.
├── app # 项目主体代码
│   ├── controllers # 控制层,处理http参数验证
│   │   └── user.js
│   ├── extend # 添加自定义context对象的属性方法
│   │   └── context.js
│   ├── model # 定义sequelize数据表模型
│   │   ├── index.js
│   │   └── user.js
│   ├── router.js # 定义全局路由
│   ├── service # 处理各个模块具体的业务逻辑
│   │   └── user.js
│   ├── utils # 工具库方法
│   │   ├── errMap.js
│   │   └── utils.js
│   └── view # 渲染视图模板
│       └── README.md
├── config # 项目全局配置
│   └── config.default.js
├── docker.sh # docker脚本,创建开发环境容器
├── database.sql # 导出的数据库
├── package-lock.json
├── package.json
└── server.js # 服务入口文件
</pre>

## 服务启动步骤

- git clone && npm install

- 初始化数据库环境(mariadb或mysql)

```bash
# 创建数据库
CREATE DATABASE `koa` /*!40100 DEFAULT CHARACTER SET utf8 */;

# 导入数据表
SOURCE database.sql;

# 查看表
SHOW TABLES;
```

- 启动服务

```bash
npm run dev
```

控制台输出

```bash
root@8de31e151a7e:/var/www/node-test/koa-demo# npm run dev

> test@1.0.0 dev /var/www/node-test/koa-demo
> nodemon server.js

[nodemon] 1.19.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching dir(s): *.*
[nodemon] starting `node server.js`
server is running...
Executing (default): SELECT 1+1 AS result
数据库连接成功.
```

## API接口

### 用户模块

#### 创建用户

- method: post
- url: /api/v1/user

- body参数

```json
{
    "name": "rachel",
    "email": "rachel@laoyou.com",
    "mobile": "18924260621"
}
```

- 返回值

```json
{
    "code": 0, # 非零表示邮箱或手机号已占用
    "msg": "" # code为0是为空
}
```

#### 用户列表

- method: get
- url: /api/v1/user?query={}

- query查询对象

```json
{
    "offset": 0,
    "limit": 10,
    "email": "rachel",
    "name": "rachel"
}
```

- 参数说明

|field|type|required|
|-----|----|--------|
|offset|number|Y|
|limit|number|Y|
|email|string|N|
|name|string|N|

- 返回值

```json
{
    "code": 0,
    "msg": "",
    "data": [
        {
            "id": 2,
            "name": "rachel",
            "email": "rachel@laoyou.com",
            "mobile": "18924260621",
            "created_at": "2019-10-08 18:19:59",
            "updated_at": "2019-10-08 18:19:59",
        }
    ],
    "total": 1
}
```

### 用户详情

- method: get
- url: /api/v1/user/:id

**id参数: 用户ID, 下同**

- 返回值

```json
{
    "code": 0,
    "msg": "",
    "data": {
        "created_at": "2019-10-08 18:19:59",
        "updated_at": "2019-10-08 18:19:59",
        "id": 2,
        "name": "rachel",
        "email": "rachel@laoyou.com",
        "mobile": "18924260621"
    }
}
```

### 编辑用户

- method: put
- url: /api/v1/user/:id

- body参数

```json
{
    "name": "rache-lucky-girl",
    "email": "rache-lucky-girl@laoyou.com"
}
```

- 参数说明

|field|type|required|
|-----|----|--------|
|name|string|N|
|email|string|N|

- 返回结果

```json
{
    "code": 0, # 非零表邮箱已占用
    "msg": ""
}
```

### 删除用户

- method: delete
- url: /api/v1/user/:id

- 返回值

```json
{
    "code": 0, # id不存在在, 返回非零值
    "msg": ""
}
```

