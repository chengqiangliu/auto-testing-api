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
  deleteFlag:{type:Number ,default:0,required:true},
  create_user:{type:String,required:true},
  update_user:{type:String}

},{
  timestamps:
  {createdAt:"create_time",updatedAt:"update_time"}})


tagsSchema.virtual('id').get(function(){
    return this._id.toHexString();
    });
    
tagsSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) { delete ret._id}
    });

const TagsModel = mongoose.model('tags', tagsSchema)

// exporting the model 
module.exports = TagsModel