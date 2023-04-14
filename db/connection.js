const mongoose = require('mongoose')

const uri = 'mongodb://root:example@mongo:27017/';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// 连接指定数据库
mongoose.connect(uri, options);

// 1.3. 获取连接对象
const connection = mongoose.connection;

module.exports = connection;
