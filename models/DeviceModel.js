//devicemodel
//mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

//device schema
const deviceSchema = new mongoose.Schema({
    deviceName: {type: String, required: true}, 
    //name: {type: String, required: true}, 
    model : {type: String, required: true},
    type: String,
    create_time: {type: String, default: formattedDate},
    update_time: {type: String, default: formattedDate},
    create_user: {type: String, required: true}, 
    update_user: String,
    delete_flag: String,
    platform: String,
    //versionKey: false 
  //clientId: {type: String, required: true}
})


const DeviceModel = mongoose.model('device', deviceSchema)

// exporting the model 
module.exports = DeviceModel
