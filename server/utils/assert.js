/**
 * @param {*错误提示信息} message
 */

const assertError = message => {
    return {
        message,
        code: -200
    }
}

module.exports = assertError