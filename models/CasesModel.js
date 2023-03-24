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
  deleteFlag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

casesSchema.virtual('id').get(function(){
  return this._id.toHexString();
 });
 
casesSchema.set('toJSON', {
 virtuals: true,
 transform: function (doc, ret) { delete ret._id  }
 });

const CasesModel = mongoose.model('cases', casesSchema)

// exporting the model 
module.exports = CasesModel