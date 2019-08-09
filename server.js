const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multipart = require('connect-multiparty')
const webpack = require('webpack')
const logger = require('morgan');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const favicon = require('serve-favicon')
const WebpackConfig = require('./webpack.config')
const path = require('path')
const fs = require('fs')

const app = express()

const dev = process.env.NODE_ENV === 'development';

// // 基于 stream 的日志写入
// if (dev) {
//   // Predefined Formats ,默认标准流 -- stream: process.stdout 
//   app.use(logger('dev'));
// } else {
//   // 写入流
//   const logFileName = path.join(__dirname, 'logs', 'access.log')
//   const writeStream = fs.createWriteStream(logFileName, {
//     flags: 'a'
//   })
//   // 原生API即 writeStream.write(log + '\n')
//   app.use(logger('combined', {
//     stream: writeStream
//   }));
// }

if (dev) {
  const compiler = webpack(WebpackConfig(undefined, {mode: 'development'}))
  app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  }))
  
  app.use(webpackHotMiddleware(compiler))
}

app.use(express.static(dev ? __dirname : path.join(__dirname, 'dist'),
  {
    setHeaders (res) {
      res.cookie('CSRF-TOKEN', 'token-test')
    }
  }
))

app.use(favicon(path.join(__dirname, './favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))


require('./cors/server2')
// app.use('/cors', require('./cors/server'))

app.use(function (error, req, res, next) {
  res.status(500).send(error)
})

// const port = process.env.PORT || 9000
// module.exports = app.listen(port, () => {
//   console.log(`Server listening on http://127.0.0.1:${port}, Ctrl+C to stop`)
// })
module.exports = app;