// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);
// 2.Defining Schema
const configurationSchema = new mongoose.Schema({
  key: {type: String, required: true},
  value: {type: String, required: true},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false,
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

configurationSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

configurationSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

// 3. Creating configuration Model
const ConfigurationModel = mongoose.model('configuration', configurationSchema)

// 4. Exporting the Configuration Model
module.exports = ConfigurationModel
