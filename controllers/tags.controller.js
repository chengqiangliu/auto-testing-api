const path = require('path');

const TagsModel = require("../models/TagsModel");
const { validate } = require('./common.controller');
const UserModel = require('../models/UserModel');


const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const { generateToken } = require('../auth');
const jwt = require("jsonwebtoken");
const { secret } = require('../config');
const {autho} = require('../auth/index');
const errorStatements = require('../lib/errorStatements');

const moment = require("moment");
const date = new Date();
const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

// adding a new tag
const tagsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        let {tags_name} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        // if tags_name already exists, return error or else create new tags
        let tags = await TagsModel.findOne({tags_name});
        if (tags) {
            logger.warn(`Tag name already exists`);
            return res.status(400).json({success: false, errors: {message:'Tag already exists',errorcode:'400'}});
        } else {            
            await TagsModel.create({create_user:userid,update_user:userid,...req.body});
            const tags = await TagsModel.findOne({tags_name});
            logger.info(`add tag successful, ${tags_name}`);
            return res.status(200).json({success: true, data:tags});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// tags update
const tagsUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const tags = req.body;

        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        tags['update_user']=userid;

        const oldTags = await TagsModel.findOneAndUpdate({_id: tags.id}, tags);
        
        // after updating the tags, we need to get the tags object data.
        var dict={};
        for(const i in Object.keys(tags)){
            var datum=Object.keys(tags)[i];
            if (datum!='__v'){
                dict[datum]=tags[datum];}
            
        }

        //dict returns the tags information
        const data = Object.assign(oldTags, tags);
        
        logger.info(`update tags successful, TagName: ${tags.tags_name}, tagId: ${tags.id}`);
        return res.status(200).json({success: true, data:{tags_name:tags.tags_name}});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// tags delete by name
const tagsDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags delete by tags_name controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {tags_name} = req.body;
        const tags = await TagsModel.findOne({tags_name});
        if(tags){
            await TagsModel.deleteOne({tags_name: tags_name});
            logger.info(`delete tag successful, ${tags_name}`);
            return res.status(200).json({success: true, message: tags_name + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: tags_name + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// tags delete by ID
const tagsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags delete by tags id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const tags = await TagsModel.findOne({_id:id});
        if(tags){
            await TagsModel.deleteOne({_id: id});
            logger.info(`delete tags successful, ${id}`);
            return res.status(200).json({success: true, message:'successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'tagid does not exist', code: "404"}] });
        }
    } catch (err) {
         logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

//fetch information of the tags

const tagsGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags info controller is started');
    try {
        //validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const tags = await TagsModel.findOne({_id:id});
        if(tags){
            return res.status(200).json({success:true, data: tags});
        }
        else{
            return res.status(404).json({success:false,errors:[{msg:id+'does not exist',code:"404"}]});
        }
        //getInformation(req, res,TagsModel);
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};


module.exports = {
    tagsAdd,
    tagsUpdate,
    tagsDelete,
    tagsDeleteById,
    tagsGet
};
