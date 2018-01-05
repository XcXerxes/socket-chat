const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const cookieSession = require('cookie-session')
const session = require('express-session')

const routes = require('./server/routes')
const app = express()
const serve = require('http').createServer(app)
const io = require('socket.io')(serve)

app.use(logger('dev'))
app.use(session({
  name: 'sessionId',
  secret: '222-333-444',
  resave: false,
  cookie: {
    httpOnly: true,
    expires: new Date(Date.now() + 6000)
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))
app.use(cors())
app.use('/chat', routes)


console.log(`session expires${new Date(Date.now() + 6000)}`)
let arr = []
/* socket */
io.on('connection', socket => {
  console.log('a user connected')
  // 用户进入时
  socket.on('user-online', data => {
    if (arr.length > 0) {
      if (arr.findIndex(item => item.userId === data.userId) > -1) {
        return false
      }
    }
    socket.name = data.userId
    arr.push(data)
    socket.broadcast.emit('user-online', arr)
    socket.emit('user-online', arr)
    console.log(data)
  })
  // 用户发送信息
  socket.on('user-message', data => {
    if (data.message) {
      socket.broadcast.emit('user-message', data)
      socket.emit('user-message', data)
    }
  })
  socket.on('disconnect', (data = {}) => {
    const idx = arr.findIndex(item => item.userId === socket.name)
    console.log('dist====' + data)
    if (idx > -1) {
      arr.splice(idx, 1)
      socket.broadcast.emit('user-online', arr)
      socket.emit('user-online', arr)
    }
  })
})

const port = process.env.PORT || 8888

serve.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://localhost:' + port + '\n')
})