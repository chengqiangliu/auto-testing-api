// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);

// 2.Defining Schema
const ciSchema = new mongoose.Schema({
  ci_url: {type: String, required: true},
  create_user: {type: String, required: true},
  reference: {type: String},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false,
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

ciSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

ciSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

// 3. Creating ci Model
const CiModel = mongoose.model('ci', ciSchema)

// 4. Exporting the Application Model
module.exports = CiModel
