var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//passport dependencies
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
var papers = require('./routes/papers');
var server = require('./routes/server')

var app = express();

// use mongoose to connect to mongodb
var mongoose = require('mongoose');
var conn = mongoose.connection;

// link to config file
var globals = require('./config/globals');

conn.open(globals.db);

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

//configure passport and sessions
app.use(session({
    secret: 'some salt value here',
    resave: true,
    saveUninitialized: false

}));

app.use(passport.initialize());
app.use(passport.session());

//link to the new account model
var Account = require('./models/account');
passport.use(Account.createStrategy());

//manage user login status through the database
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', index);
app.use('/', server);
app.use('/users', users);
app.use('/papers', papers); // handle all requests at /papers with papers router

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Thank You for Viewing My Portfolio'
      });
});

module.exports = app;
