//casesmodel
//mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

//user schema
const casesSchema = new mongoose.Schema({
  title: {type: String, required: true},
  external_id:{type:String,required:true},
  feature:{type:String},
  location:{type:String},
  reference:{type:String},
  create_time: {type: String, default: formattedDate},

})


const CasesModel = mongoose.model('cases', casesSchema)

// exporting the model 
module.exports = CasesModel