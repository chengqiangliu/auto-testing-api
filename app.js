const createError = require('http-errors');
const express = require('express');
const path = require('path');

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

const userRouter = require('./routes/user.route');
app.use('/api/user', userRouter);
const appsRouter = require('./routes/apps.route');
app.use('/api/apps', appsRouter);

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
  logger.error(`Error Occur. Error Status: ${err.status}, Error Message: ${err.message}`)
  res.send('error');
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
