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
├── package-lock.json
├── package.json
└── server.js # 服务入口文件
</pre>