// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);

// 2.Defining Schema
const appsSchema = new mongoose.Schema({
  apps_name: {type: String, required: true},
  url: {type: String, required: true},
  //version: {type: String, required: true},
  version: {type: String},
  build: {type: String, required: true},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false,
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

appsSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

appsSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

// 3. Creating Application Model
const AppsModel = mongoose.model('apps', appsSchema)

// 4. Exporting the Application Model
module.exports = AppsModel
