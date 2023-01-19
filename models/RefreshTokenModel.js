/*
能操作refreshToken集合数据的Model
 */
// 1.引入mongoose
const mongoose = require('mongoose')

// 2.字义Schema(描述文档结构)
const refreshTokenSchema = new mongoose.Schema({
  clientId: { type: String },
  userId: {type: String, required: true},
  refreshToken: {type: String, required: true},
})

// 3. 定义Model(与集合对应, 可以操作集合)
const RefreshTokenModel = mongoose.model('refreshToken', refreshTokenSchema)

// 4. 向外暴露Model
module.exports = RefreshTokenModel