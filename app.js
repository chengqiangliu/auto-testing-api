const createError = require('http-errors');
const express = require('express');
const formidable = require('express-formidable');
const multer = require('multer');
const morgan = require('morgan');
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
//app.use(formidable());
//app.use(express.text());

const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
  cb(null, `${Date.now()}--${file.originalname}`);
    },
  });

const checkFileType = function (file, cb) {
//Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
      return cb(null, true);
    } else {
      cb("Error: You can Only Upload Images!!");
    }
  };
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
        },
    });

app.post("/upload", upload.single("image"), (req, res) => {
      const { text } = req.body;
      const imageUrl = req.file.path;
      if (imageUrl) {
        res.send("Single file uploaded successfully");
      } else {
        res.status(400).send("Please upload a valid image");
      }
    });

// import cookieParser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//import verify token middleware
const verifyToken = require('./verifyTock')
var unless = function(path, middleware) {
  return function(req, res, next) {
      if (path.includes(req.path)) {
          return next();
      } else {
          return middleware(req, res, next);
      }
  };
};

//error with swagger as of now, to solve the issue, the below line should be commented.
//error is that when the swagger path is being given the unless function or the post request is not being processed
//still researching about this issue
app.use(unless('/api/users/add',verifyToken))




const userRouter = require('./routes/user.route');
const { verify } = require('crypto');
app.use('/api/users', userRouter);

const tagsRouter = require('./routes/tags.route');
app.use('/api/tag',tagsRouter);

const errorsRouter = require('./routes/errors.route');
app.use('/api/errors',errorsRouter);

const casesRouter = require('./routes/cases.route');
app.use('/api/cases',casesRouter);

const casetagsRouter = require('./routes/casetags.route');
app.use('/api/casetags', casetagsRouter);

const resultsRouter = require('./routes/results.route');
app.use('/api/results', resultsRouter);

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const upload = multer({
//   dest:"uploads/",
//   limits: {fileSize:1000000}
// })
// app.post('/upload',upload.single('file'),(req,res) => {
//   console.log(req.file);
//   res.send('File uploaded succesfully');
// });

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
  res.status(401).json({success: false, errors: {errormessage:`error has occured,${err}`,errorcode:'401'}});
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
