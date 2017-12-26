const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'static')))


const port = process.env.PORT || 8888

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
  console.log('Listening at http://localhost:' + port + '\n')
})