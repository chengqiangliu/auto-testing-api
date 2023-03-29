// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// 2.Defining Schema
const resultsSchema = new mongoose.Schema({
  status: {type: String, required: true},
  created_at:{type:String},
  finished_at:{type:String},
  error:{type:String, required:true},
  run:{type:String,required:true},
  case:{type:String,required:true},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false,
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

resultsSchema.virtual('id').get(function(){
  return this._id.toHexString();
 });
 
resultsSchema.set('toJSON', {
 virtuals: true,
 transform: function (doc, ret) {   delete ret._id  }
 });

// 3. Creating case tags Model
const ResultsModel = mongoose.model('results', resultsSchema)

// 4. Exporting the case tags Model
module.exports = ResultsModel
