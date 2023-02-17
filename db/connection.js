const mongoose = require('mongoose')

const uri = 'mongodb://127.0.0.1:27017/device';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// 连接指定数据库
mongoose.connect(uri, options);

// 1.3. 获取连接对象
const connection = mongoose.connection;

module.exports = connection;