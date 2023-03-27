// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);

// 2.Defining Schema
const jobsSchema = new mongoose.Schema({
  app_id: {type: String, required: true},
  device_id: {type: String, required: true},
  ci_id: {type: String, required: true},
  environment: {type: String, required: true},
  started_at: {type: String, required: true},
  finished_at: {type: String, required: true},
  status: {type: String, required: true},
  deleteFlag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false},{
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

jobsSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

jobsSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

// 3. Creating jobs tags Model
const JobsModel = mongoose.model('jobs', jobsSchema)

// 4. Exporting the jobs Model
module.exports = JobsModel
