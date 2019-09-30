"use strict"
/**
 * 用户管理
 */

 /**
  * @name UserService
  * @desc 处理用户模块的业务逻辑
  */
class UserService {
    /**
     * 
     * @param {object} user
     * @member {string} name, 用户名
     * @member {string} email, 用户邮箱(唯一)
     * @member {string} mobile, 手机号(唯一)
     */
    static create({
        name,
        email,
        mobile
    }) {
        
    }
}

module.exports = UserService