//tagsmodel
//mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

//user schema
const tagsSchema = new mongoose.Schema({
  tagsname: {type: String, required: true}, 
  create_time: {type: String, default: formattedDate},

})


const TagsModel = mongoose.model('tags', tagsSchema)

// exporting the model 
module.exports = TagsModel