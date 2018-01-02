const db = require('../models')
const assertError = require('../utils/assert')

/**
 * 用户登陆
 * @param {*request} req 
 * @param {*requrest} res 
 */
exports.login = (req, res) => {
  const {username, password} = req.body
  const self = req
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
        req.session.userId = result.id
        req.session.username = result.username
        res.json({
          code: 200,
          message: 'success',
          data: {
            userId: result.id,
            username: result.username
          }
        })
      } else {
        return res.json(assertError('密码错误'))
      }
    } else {
      return res.json(assertError('用户名不存在'))
    }
  })
}

/**
 * 用户注册
 * @param {*} req 
 * @param {*} res 
 */
exports.register = (req, res) => {
  // let client_ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  //   || req.socket.remoteAddress || req.connection.socket.remoteAddress
  const {username, password, confirm_password, email} = req.body
  if (!username || !password || !confirm_password || !email || password !== confirm_password) {
    return res.json(assertError('参数不能为空或者参数有误'))
  }
  let {ip} = req
  ip && (ip = ip.substr(ip.lastIndexOf(":") + 1))
  db.user.create({
    username,
    password,
    confirm_password,
    email,
    client_ip: ip
  }).then(result => {
    return res.json({
      code: 200,
      message: 'success',
      data: {id: result.id}
    })
  }).catch(err => {
    return res.json(assertError(err.toString()))
  })
}

exports.checkUserNameOrEmail = (req, res) => {
  const {username, email} = req.body
  if (username || email) {
    db.user.findOne({
      where: {
        $or: [
          {username},
          {email}
        ]
      }
    }).then(result => {
      if (result) {
        console.log("result ===========" + result)
        return res.json({
          code: 200,
          message: '已存在',
          data: {id: result.id}
        })
      } else {
        return res.json({
          code: -404,
          message: '不存在',
          data: {}
        })
      }
    }).catch(err => {
      return res.json(assertError(err.toString()))
    })
  } else {
    return res.json(assertError('缺少参数'))
  }
}