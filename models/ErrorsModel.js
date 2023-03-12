//errorsmodel
//mongoose
const mongoose = require('mongoose')


const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

//user schema
const errorsSchema = new mongoose.Schema({
  type: {type: String, required: true},
  message:{type:String,required:true},
  backtrace:{type:String},
  screenshot:{type:Buffer},
  create_time: {type: String, default: formattedDate},

})


const ErrorsModel = mongoose.model('errors', errorsSchema)

// exporting the model 
module.exports = ErrorsModel