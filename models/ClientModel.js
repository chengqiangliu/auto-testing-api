/*
能操作client集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')
const md5 = require("blueimp-md5");

// 2.字义Schema(描述文档结构)
const clientSchema = new mongoose.Schema({
  clientId: { type: String, required: true},
  clientName: { type: String, required: true},
  clientSecret: { type: String, required: true},
  redirectUri: { type: String }
})

// 3. 定义Model(与集合对应, 可以操作集合)
const ClientModel = mongoose.model('client', clientSchema);

// 初始化默认超级管理员用户: admin/admin
ClientModel.findOne({clientId: '9999'}).then(client => {
  if(!client) {
    ClientModel.create({clientId: '9999', clientName: 'Administrator', clientSecret: md5('admin'), redirectUri: ''})
        .then(user => {
          console.log('Initial Client: clientId: 9999')
        })
  }
})

// 4. 向外暴露Model
module.exports = ClientModel;