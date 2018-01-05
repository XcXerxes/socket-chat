const db = require('../models')
const utils = require('../utils')
console.log(utils.randomColor())
db.user.sync().then(() => {
  db.user.create({
    username: 'leo',
    password: '123456',
    confirm_password: '123456',
    email: 'xcxerxes@aliyun.com',
    role: 'admin',
    avatar: utils.randomColor(),
    client_ip: '10.10.10.40'
  })
})