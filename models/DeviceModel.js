//devicemodel
//mongoose
const mongoose = require('mongoose')
const md5 = require('blueimp-md5')
const moment = require("moment");
//date formating to display it with the time as well
const date = new Date();
const Constants = require('../lib/constants');
const formattedDate = moment(date).format(Constants.DATE_TIME_FORMAT);

//device schema
const deviceSchema = new mongoose.Schema({
    device_name: {type: String, required: true}, 
    model : {type: String, required: true},
    delete_flag:{type:Number ,default:0,required:true},
    create_user: {type: String, required: true},
    update_user:{type:String}
},{versionKey: false,
    timestamps:
    {createdAt:"create_time",updatedAt:"update_time"}})

deviceSchema.virtual('id').get(function(){
    return this._id.toHexString();
  });
  
deviceSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {   delete ret._id  }
});
  
const DeviceModel = mongoose.model('device', deviceSchema)

// exporting the model 
module.exports = DeviceModel
