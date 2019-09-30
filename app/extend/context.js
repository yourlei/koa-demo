"use strict"
/**
 * 自定义App#context对象的扩展方法
 */
const errCode = require("../utils/errMap").errCode
const errMap = require("../utils/errMap").errMap
module.exports = {
    /**
     * @name validate
     * @desc 参数验证器
     * @param {object} rules 验证规则
     * @param {object} target 验证的对象
     * 
     * @return Object
     */
    /**
     * Example:
     * ```js
     * rules = {
     *   name: {type: "string"},
     *   mobile: {type: "string", required: true, len: 11},
     *   email: {type: "string", required: true},
     *   roleId: {type: "array"}
     * }
     * 
     * target = {
     *   name: "Rachel",
     *   mobile: "18924260620",
     *   email: "Rachel@laoyou.com",
     *   roleId: [1, 2]
     * }
     * ```
     */
    validate: (rules, target) => {
        if (typeof rules != 'object' || !Object.keys(rules).length) {
            throw new TypeError("参数类型错误, rules应为object")
        }
        // 提取字段
        const allowField = Object.keys(rules)
        const targetField = Object.keys(target)
        // 验证字段是否合法
        for (let i = 0; i < targetField.length; i++) {
            if (allowField.indexOf(targetField[i]) === -1) {
                return response(1, `不合法的字段${targetField[i]}`)
            }
        }
        // 遍历rules中的规则, 检查target参数是否满足规则
        for (let key in rules) {
            const item = rules[key]
            const _type = item.type
            // 字段值默认允许为空
            const _empty = item.hasOwnProperty("empty") ? item.empty : true
            // 默认为可选字段
            const _required = item.required || false
            const _minLength = item.minLength || 0
            const _maxLength = item.maxLength || 0
            // 参数是否包含该属性
            const _hasProperty = target.hasOwnProperty(key)
            // 属性值
            const _val = _hasProperty ? target[key] : null
            // 必传字段
            if (_required) {
                if (!_hasProperty) {
                    return response(1, `缺少${key}参数`)
                }
            }
            // 非必传字段, 若参数中有则检查
            if (_hasProperty) {
                /** 检查类型 */
                let pass = true
                let msg = `${key}参数类型错误`
                switch(_type) {
                    case "email":
                        pass = checkEmail(_val)
                        msg = pass ? msg : `邮箱格式错误`
                        break
                    case "password":
                        break
                    case "array":
                        pass = checkArray(_val)
                        break
                    default:
                        pass = _type === typeof _val
                        break
                }
                
                if (!pass) {
                    return response(1, msg)
                }
                // 是否允许为空值
                if (!_empty && !_val.length) {
                    return response(1, `${key}参数值不能为空`)
                }
                // 若为字符串或是数组,检查最大, 最小长度范围
                if (_type==="string" || checkArray(_val)) {
                    if (_minLength && _minLength >= _val.length) {
                        return response(1, `${key}参数最小长度为${_minLength}`)
                    }
                    if (_maxLength && _maxLength < _val.length) {
                        return response(1, `${key}参数最大长度为${_maxLength}`)
                    }
                }
            }
            
        }
        return response()
    },
    /**
     * 格式化接口返回的数据
     * @param {int} code, 错误码
     * @param {string} msg, 错误提示信息
     * @param {*} data, 返回的数据
     */
    outputJson: (code=0, msg="", data) => {
        if (code) {
            msg = errMap[code]
        }
        
        if (data) {
            return {code, msg, data}
        }
        return {code, msg}
    }
}
/**
 * 正则表达式Regx
 */
// http://www.regular-expressions.info/email.html
const reg_email = /^[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+(?:\.[a-z0-9\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+)*@(?:[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\-]*[a-z0-9])?$/i
const reg_date = /^\d{4}\-\d{2}\-\d{2}$/
const reg_datetime = /^\d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2}$/
/**
 * 处理响应
 * @param {int} code, default=0 
 * @param {string} msg, 返回错误提示信息
 * 
 * @return Object
 */
function response(code=0, msg="") {
    return {code, msg}
}
/**
 * 检查邮箱格式
 * @param {string} str 
 */
function checkEmail(str) {
    return reg_email.exec(str) != null
}
/**
 * 检查是否为数组
 * @param {*} val 
 */
function checkArray(val) {
    return Array.isArray(val)
}