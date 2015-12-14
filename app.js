var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');


require('./models/models');

var mongoose = require('mongoose'); 
if(process.env.DEV_ENV){
    mongoose.connect('mongodb://localhost/twiapp');             //connect to Mongo
}
else{
<<<<<<< HEAD
    mongoose.connect('mongodb://kups:qwerty@ds027835.mongolab.com:27835/heroku_7qh0b5bv');
}                        //Connect to mongolabs db
    
//uncomment on implementing module 4
//var auth = require('./routes/authenticate');
=======
    mongoose.connect('mongodb://kups:<dbpassword>@ds061474.mongolab.com:61474/mytwiapp');
}                        //add for Mongo support
mongoose.connect('mongodb://localhost/twiapp');             //connect to Mongo

var auth = require('./routes/authenticate');
>>>>>>> develop
var api = require('./routes/api');
var index = require('.routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
