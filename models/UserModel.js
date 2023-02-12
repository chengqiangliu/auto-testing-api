//usermodel
//mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

//user schema
const userSchema = new mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
  phone: String,
  email: String,
  create_time: {type: String, default: formattedDate},
  role_id: String,
  clientId: {type: String, required: true}
})


const UserModel = mongoose.model('users', userSchema)

// exporting the model 
module.exports = UserModel
