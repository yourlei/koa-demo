"use strict"
/**
 * 自定义App#context对象的扩展方法
 */
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

        return response()
    }
}

function response(code=0, msg="") {
    return {code, msg}
}