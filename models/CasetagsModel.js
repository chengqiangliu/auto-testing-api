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
},{versionKey: false})

// 3. Creating case tags Model
const CasetagsModel = mongoose.model('casetags', casetagsSchema)

// 4. Exporting the case tags Model
module.exports = CasetagsModel