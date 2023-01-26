const mongoose = require('mongoose')

const uri = 'mongodb://xiaoxiong:daigou@192.168.10.102:27017/benben_daigou?directConnection=true&authSource=admin&replicaSet=benbn-rps&retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
};

// 连接指定数据库
mongoose.connect(uri, options);

// 1.3. 获取连接对象
const connection = mongoose.connection;

module.exports = connection;