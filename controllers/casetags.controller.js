const path = require('path');

const CasetagsModel = require("../models/CasetagsModel");
const CasesModel = require("../models/CasesModel");
const UserModel = require('../models/UserModel');
const TagsModel = require("../models/TagsModel");
const { validate } = require('./common.controller');
const {autho} = require('../auth/index');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding a case tag
const casetagsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The case tags add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {case_id,tag_id} = req.body
        //accesstoken checking

        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        const cases = await CasesModel.findOne({_id:case_id});
        const tags= await TagsModel.findOne({_id:tag_id});
        if(cases && tags){
            // if tag_id already exists, return error or else create a new case tag
            const casetags = await CasetagsModel.findOne({case_id:case_id,tag_id:tag_id});
            if (casetags) {
                logger.warn(`the casetag already exists`);
                return res.status(400).json({success: false, error: {message:'case tags already exists',code:'400'}});
            } else { 
                await CasetagsModel.create({create_user:userid,update_user:userid,...req.body});
                const casetags = await CasetagsModel.findOne({case_id:case_id,tag_id:tag_id});
                logger.info(`add case tag successful`);
                return res.status(200).json({success: true, data: casetags});
            }
        } else {
            if(cases==null && tags!=null){
                logger.info(`add casetags failed,case_id doesn't exist`);
                return res.status(500).json({success: false, error: {message: 'add case tags failed due to nonexistent case_id!',code:'500'}});
    
            }
            if(cases!=null && tags==null){
                logger.info(`add casetags failed,tag_id doesn't exist`);
                return res.status(500).json({success: false, error: {message: 'add case tags failed due to nonexistent tag_id!',code:'500'}});
    
            }
            else{
                logger.info(`add casetags failed,case_id or tag_id doesn't exist`);
                return res.status(500).json({success: false, error: {message: 'add case tags failed due to nonexistent case_id and tag_id!',code:'500'}});
            }
        }
        
    } catch (err) {
        logger.error(`add casetags failed, system error。${err}`);
        return res.status(500).json({success: false, error: {message: 'add case tags failed, system error!',code:'500'}});
    }
};

const casetagsUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The casetags update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const casetags = req.body;
        logger.info(casetags)
        let Rcases = 1;
        if ('case_id' in casetags){
            logger.info('case_id attribute is present')
            Rerror = await CasesModel.findOne({_id:casetags.case_id});
            
        }
        let Rtags=1;
        if('tag_id' in casetags){
            logger.info('tags attribute is present')
            Rtags= await TagsModel.findOne({_id:casetags.tag_id})
        }

         //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        casetags['update_user']=userid;
    
        if(Rtags && Rcases){
        const oldcasetags = await CasetagsModel.findOneAndUpdate({_id: casetags.id}, casetags);
        // after updating the casetags, we need to get the casetags object data.
        var dict={};
        for(const i in Object.keys(casetags)){
            var datum=Object.keys(casetags)[i];
            if (datum!='__v'){
                dict[datum]=casetags[datum];}
            
        }

        //dict returns the apps information
        const data = Object.assign(oldcasetags, casetags);
        logger.info(`update casetags successful`);
        return res.status(200).json({success: true, data: data});
    } else {
        logger.info('one of required attributes doesnt exist in the parent table');
    }
    } catch (err) {
        logger.error(`update casetags failed, system error。${err}`);
        return res.status(500).json({success: false, error: {message: 'update casetags failed, system error!',code:'500'}});
    }
};


// casetags delete by ID
const casetagsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The casetags delete by _id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const casetags = await CasetagsModel.findOne({id});
        if(casetags){
            await CasetagsModel.deleteOne({_id: id});
            logger.info(`delete casetags successful, ${id}`);
            return res.status(200).json({success: true, message: casetags.id + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: casetags.id + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(`delete casetags failed, system error。${err}`);
        return res.status(500).json({success: false, error:[{ msg: 'delete casetags failed, system error!', code: '500'}]});
    }
};

// fetch information of the casetags
const casetagsGetInfo = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The casetags info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const casetags = await CasetagsModel.findOne({_id:id});
        if(casetags){
            return res.status(200).json({success:true, data: casetags});
        }
        else{
            return res.status(404).json({success:false,error:[{msg:id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(`get case tags info failed, system error。${err}`);
        return res.status(500).json({success: false, error: ['get casetags info failed, system error!']});
    }
};


module.exports = {
    casetagsAdd,
    casetagsUpdate,
    casetagsDeleteById,
    casetagsGetInfo
};
