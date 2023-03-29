// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// 2.Defining Schema
const casetagsSchema = new mongoose.Schema({
  tag_id: {type: String, required: true},
  case_id:{type:String,required:true},
  create_time: {type: String, default: formattedDate},
  delete_flag:{type:Number ,default:0,required:true},
  create_user:{type:String},
  update_user:{type:String}
},{versionKey: false},{
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})

casetagsSchema.virtual('id').get(function(){
  return this._id.toHexString();
 });
 
casetagsSchema.set('toJSON', {
 virtuals: true,
 transform: function (doc, ret) { delete ret._id  }
 });

// 3. Creating case tags Model
const CasetagsModel = mongoose.model('casetags', casetagsSchema)

// 4. Exporting the case tags Model
module.exports = CasetagsModel