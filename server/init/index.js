const db = require('../models')
db.user.sync().then(() => {
  db.user.create({
    username: 'leo',
    password: '123456',
    confirm_password: '123456',
    email: 'xcxerxes@aliyun.com',
    role: 'admin',
    client_ip: '10.10.10.40'
  })
})