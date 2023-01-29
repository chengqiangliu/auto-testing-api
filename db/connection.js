const mongoose = require('mongoose')

const uri = 'mongodb://auto:passwd@10.211.55.3:27017/auto-testing';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// 连接指定数据库
mongoose.connect(uri, options);

// 1.3. 获取连接对象
const connection = mongoose.connection;

module.exports = connection;