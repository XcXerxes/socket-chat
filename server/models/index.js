const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')

const {database, username, password, host, dialect, pool} = config
// 初始化orm数据库连接池
// const sequelize = new Sequelizec(database, username, password, {
//   host,
//   dialect,
//   pool
// })
const sequelize = new Sequelize(config)
sequelize.authenticate().then(() => {
  console.log('connect success')
}).catch(err => {
  console.error('unable', err)
})