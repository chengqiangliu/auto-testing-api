// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// 2.Defining Schema
const jobsSchema = new mongoose.Schema({
  app_id: {type: String, required: true},
  device_id: {type: String, required: true},
  ci_id: {type: String, required: true},
  environment: {type: String, required: true},
  started_at: {type: String, required: true},
  finished_at: {type: String, required: true},
  status: {type: String, required: true},
  create_time: {type: String, default: formattedDate},
},{versionKey: false})

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