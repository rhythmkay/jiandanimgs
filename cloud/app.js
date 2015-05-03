var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var imgs = require(path.join(__dirname, 'routes/imgs'))
var app = express()

// App 全局配置
app.set('views', path.join(__dirname, 'views'))   // 设置模板目录
app.set('view engine', 'hbs')    // 设置 template 引擎


app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.static('static'))

app.get('/', function(req, res) {
  res.send('Jade Gu')
})

app.get('/imgs', imgs)
app.get('/imgs/:page', imgs)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(8000)
