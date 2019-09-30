"use strict"
/** 
 * 定义错误字典 
 */
// 错误码
const errCode = {
    exist_mobile_email: 10001,
}
// 错误信息
const errMap = {}

errMap[`${errCode.exist_mobile_email}`] = "邮箱或是手机号已占用"

module.exports = {
    errCode: errCode,
    errMap: errMap
}