const db = require('../models')
db.user.sync().then(() => {
  db.user.create({
    username: 'leo',
    password: '123456',
    role: 'admin'
  })
})