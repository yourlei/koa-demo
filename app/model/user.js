"use strict"
/**
 * @desc User Model
 * @author leiyu
 */
const moment = require("moment")
const Sequelize = require("sequelize")
const { INTEGER, STRING } = Sequelize

/**
 * 定义Model
 * 文档: https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/models-definition.md
 */
module.exports = {
    id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: STRING,
    email: {
        type: STRING,
        validate: {
            isEmail: true,
            // allowNull: false,
        }
    },
    mobile: {
        type: STRING,
        validate: {
            // allowNull: false,
            len: 11
        }
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue("created_at")).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return moment(this.getDataValue("updated_at")).format("YYYY-MM-DD HH:mm:ss")
        }
    },
    deleted_at: {
        type: Date,
        defaultValue: "2000-01-01 00:00:00",
        // issu: 若没有指定时间值, sequelize将datetime默认值设置为"2000-01-01 00:00:00"
        get() {
            return moment(this.getDataValue("deleted_at")).format("YYYY-MM-DD HH:mm:ss")
        }
    }
}