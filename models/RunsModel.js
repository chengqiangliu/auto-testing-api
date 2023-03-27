// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);

// 2.Defining Schema
const runsSchema = new mongoose.Schema({
  job_id: {type: String, required: true},
  created_at: {type: String, required: true},
  finished_at: {type: String, required: true},
  total: {type: String, required: true},
  status: {type: String, required: true},
  create_time: {type: String, default: formattedDate},
},{versionKey: false})

runsSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

runsSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {   delete ret._id  }
});

// 3. Creating runs Model
const RunsModel = mongoose.model('runs', runsSchema)

// 4. Exporting the runs Model
module.exports = RunsModel