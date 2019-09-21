const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const moment = require('moment');
const session = require('express-session');
const passport = require('passport');

const app = express();

// config
const mongodb_uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/market-db';

// Connect to DB
mongoose.set('debug', true);

mongoose.connect(mongodb_uri, {useNewUrlParser: true})
    .then(() => {
      console.log(moment().format() +
      ' [mongoose] connection established to '
      + mongodb_uri);
    })
    .catch((err) => {
      console.error(moment().format() +
      ' [mongoose] connection error '
      + err);
      process.exit(1);
    });

// Models
require('./models/Order');
require('./models/User');
require('./models/Product');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: false, // TODO: change secret
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
