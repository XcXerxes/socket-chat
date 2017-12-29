const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config')
"use strict"

const {database, username, password, host, dialect, pool} = config
// 初始化orm数据库连接池
// const sequelize = new Sequelizec(database, username, password, {
//   host,
//   dialect,
//   pool
// })
const sequelize = new Sequelize(config)

// 初始化数据模型， 同时创建数据库表结构
let db = {}
const dirNames = fs.readdirSync(__dirname)
dirNames.filter(file => file.includes('.') && file !== 'index.js')
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
})
db.sequelize = sequelize
db.Sequelize = Sequelize
db.Op = Sequelize.Op

module.exports = db

sequelize.authenticate().then(() => {
  console.log('connect success')
}).catch(err => {
  console.error('unable', err)
})