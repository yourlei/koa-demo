"use strict"
/**
 * @desc User Model
 * @author leiyu
 */
const Sequelize = require("sequelize")
const { INTEGER, STRING, DATE } = Sequelize

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
            allowNull: false,
        }
    },
    mobile: {
        type: STRING,
        validate: {
            allowNull: false,
            len: 11
        }
    },
    created_at: {
        type: DATE,
    },
    updated_at: {
        type: DATE
    },
    deleted_at: {
        type: DATE,
        defaultValue: "0000-01-01 00:00:00"
    }
}