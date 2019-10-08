"use strict"
/** 
 * 定义错误字典 
 */
// 错误码
const errCode = {
    EXIST_MOBILE_EMAIL: 10001,
    NOT_FOUND: 10002,
}
// 错误信息
const errMap = {}

errMap[`${errCode.EXIST_MOBILE_EMAIL}`] = "邮箱或是手机号已占用"
errMap[`${errCode.NOT_FOUND}`] = "数据不存在"


module.exports = {
    errCode: errCode,
    errMap: errMap
}