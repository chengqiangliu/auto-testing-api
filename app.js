const createError = require('http-errors');
const express = require('express');
const path = require('path');
const jwt = require("jsonwebtoken");
const { secret } = require('./config');


// mongodb connection
const connection = require('./db/connection');

// logger
const Constants = require('./lib/constants');
const logger = require('./lib/logger').API;
logger.addContext(Constants.FILE_NAME, path.basename(__filename));

// import middleware used to parse post request
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// import cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//import verify token middleware
const verifyToken = require('./verifyTock')
var unless = function(path, middleware) {
  return function(req, res, next) {
      if (path === req.path) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};
app.use(unless('/api/user/add',verifyToken))


const userRouter = require('./routes/user.route');
const { verify } = require('crypto');
app.use('/api/user', userRouter);
const ciRouter = require('./routes/ci.route');
app.use('/api/ci', ciRouter);
const configurationRouter = require('./routes/configuration.route');
app.use('/api/configuration', configurationRouter);

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
  //res.status(err.status || 500);
  logger.error(`Error Occur. Error Status: ${err.status}, Error Message: ${err.message}`)
  //res.send('error');
  res.status(401).json({success: false, errors: {errormessage:`update user failed,${err}`,errorcode:'401'}});
});

// mongodb is connected
connection.on('connected', () => {
  logger.info('MongoDB is connected successfully.')
})

// failed to connect mongodb
connection.on('error', (error) => {
  logger.error('MongoDB is connected failed.', error)
});


module.exports = app;
