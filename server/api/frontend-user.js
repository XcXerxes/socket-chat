const db = require('../api')
const assertError = require('../utils/assert')

/**
 * 用户登陆
 * @param {*request} req 
 * @param {*requrest} res 
 */
exports.login = (req, res) => {
  const {username, password} = req.body
  if (!username || !password) {
    return res.json(assertError('用户名或密码不能为空'))
  }
  db.user.findOne({
    where: {
      $or: [
        {username},
        {email: username}
      ]
    }
  }).then(result => {
    if (result) {
      if (result.password === password) {
        console.log('登录成功')
      } else {
        return res.json(assertError('密码错误'))
      }
    } else {
      return res.json(assertError('用户名不存在'))
    }
  })
}

exports.register = (req, res) => {
  const {username, password, confirm_password, email} = req.body
  if (!username || !password || !confirm_password || !email || password !== confirm_password) {
    return res.json(assertError('参数不能为空或者参数有误'))
  }
}