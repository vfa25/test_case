const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())

const router = express.Router()
const CORSARR = ['http://localhost:9000', 'http://127.0.0.1:9000', 'http://case.vfa25.cn']
const cors = {
  'Access-Control-Allow-Origin': '',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

router.use(function(req, res, next) {
  if (CORSARR.includes(req.get('origin'))){
    cors['Access-Control-Allow-Origin'] = req.get('origin')
  }
  next()
})

router.post('/cors/server2', function(req, res) {
  res.set(cors)
  res.json(req.cookies)
})

router.options('/cors/server2', function(req, res) {
  res.set(cors)
  res.end()
})

app.use(router)

const port = 9001
module.exports = app.listen(port)
