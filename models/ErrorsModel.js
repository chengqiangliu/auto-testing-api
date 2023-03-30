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
  type: {type: String, index: true, text: true, required: true},
  message:{type:String, index: true, text: true, required:true},
  backtrace:{type:String},
  screenshot:{type:Buffer},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey:false,
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

errorsSchema.virtual('id').get(function(){
    return this._id.toHexString();
   });
   
errorsSchema.set('toJSON', {
   virtuals: true,
   transform: function (doc, ret) {   delete ret._id  }
   });

const ErrorsModel = mongoose.model('errors', errorsSchema)

// exporting the model 
module.exports = ErrorsModel
