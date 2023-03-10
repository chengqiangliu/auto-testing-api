const path = require('path');

const TagsModel = require("../models/TagsModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

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
        let {tagsname} = req.body
        // if tagsname already exists, return error or else create new tags
        let tags = await TagsModel.findOne({tagsname});
        if (tags) {
            logger.warn(`Tag name already exists`);
            return res.status(400).json({success: false, errors: {errormessage:'Tag already exists',errorcode:'400'}});
        } else { 
            await TagsModel.create({...req.body});
            const tags = await TagsModel.findOne({tagsname});
            logger.info(`add tag successful, ${tagsname}`);
            return res.status(200).json({success: true, data:{name: tagsname}});
        }
    } catch (err) {
        logger.error(`add tag failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'add tag failed, system error!',errorcode:'500'}});
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
        const oldTags = await TagsModel.findOneAndUpdate({_id: tags._id}, tags);
        // after updating the tags, we need to get the tags object data.
        var dict={};
        for(const i in Object.keys(tags)){
            var datum=Object.keys(tags)[i];
            if (datum!='__v'){
                dict[datum]=tags[datum];}
            
        }

        //dict returns the tags information
        const data = Object.assign(oldTags, tags);
        logger.info(`update tags successful, TagName: ${tags.tagsname}, tagId: ${tags._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update tags failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'update tags failed, system error!',errorcode:'500'}});
    }
};

// tags delete by name
const tagsDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags delete by tagsname controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {tagsname} = req.body;
        const tags = await TagsModel.findOne({tagsname});
        if(tags){
            await TagsModel.deleteOne({tagsname: tagsname});
            logger.info(`delete tag successful, ${tagsname}`);
            return res.status(200).json({success: true, message: tagsname + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: tagsname + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete tags failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete tags failed, system error!', errorcode: '500'}]});
    }
};

// tags delete by ID
const tagsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The tags delete by Tagsname controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {_id} = req.body;
        const tags = await TagsModel.findOne({_id});
        if(tags){
            await TagsModel.deleteOne({_id: _id});
            logger.info(`delete tags successful, ${_id}`);
            return res.status(200).json({success: true, message:' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'tagname does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete tags failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete tags failed, system error!', errorcode: '500'}]});
    }
};




module.exports = {
    tagsAdd,
    tagsUpdate,
    tagsDelete,
    tagsDeleteById,
};
