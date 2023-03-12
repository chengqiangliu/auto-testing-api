// 1.importing mongoose
const mongoose = require('mongoose')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// 2.Defining Schema
const configurationSchema = new mongoose.Schema({
  key: {type: String, required: true},
  value: {type: String, required: true},
  create_time: {type: String, default: formattedDate},
},{versionKey: false})

// 3. Creating configuration Model
const ConfigurationModel = mongoose.model('configuration', configurationSchema)

// 4. Exporting the Configuration Model
module.exports = ConfigurationModel