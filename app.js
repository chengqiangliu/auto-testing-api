/*
 * 应用的启动模块
 */
const express = require('express');
const app = express();
const connection = require('./db/connection');

const path = require('path');
const Constants = require('./lib/constants');
const logger = require('./lib/logger').API;
logger.addContext(Constants.FILE_NAME, path.basename(__filename));

// 声明使用解析post请求的中间件
app.use(express.urlencoded({extended: true})) // 请求体参数是: name=tom&pwd=123
app.use(express.json()) // 请求体参数是json结构: {name: tom, pwd: 123}

// 声明使用解析cookie数据的中间件
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { verifyToken, errorTokenHandler } = require('./auth');
app.use(verifyToken()); // 接收所有请求验证

// 声明使用路由器中间件
app.use('/api/user', require('./routes/user.route'));
app.use('/api/token', require('./routes/token.route'));
app.use('/api/role', require('./routes/role.route'));
app.use('/api/category', require('./routes/category.route'));
app.use('/api/product', require('./routes/product.route'));

app.use(errorTokenHandler);

// 通过mongoose连接数据库
connection.on('connected', () => {
    logger.info('MongoDB is connected successfully.')
})

connection.on('error', (error) => {
    logger.error('MongoDB is connected failed.', error)
});

module.exports = app;
