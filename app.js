const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const cookieSession = require('cookie-session')
const session = require('express-session')

const routes = require('./server/routes')
const app = express()

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
app.use('/chat', routes)
console.log(`session expires${new Date(Date.now() + 6000)}`)


const port = process.env.PORT || 8888

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://localhost:' + port + '\n')
})