const path = require('path');

const CiModel = require("../models/CiModel");
const { validate } = require('./common.controller');
const UserModel = require('../models/UserModel');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');
const {autho} = require('../auth/index')

// adding a ci
const ciAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The ci add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {ci_url} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        // if ci_url already exists, return error or else create a new apps
        const ci = await CiModel.findOne({ci_url});
        if (ci) {
            logger.warn(`the ci_url already exists, ${ci.ci_url}`);
            return res.status(400).json({success: false, errors: {errormessage:'Ci already exists',errorcode:'400'}});
        } else { 
            await CiModel.create({create_user:userid,update_user:userid,...req.body});
            const ci = await CiModel.findOne({ci_url});
            logger.info(`add ci successful, ${ci.ci_url}`);
            return res.status(200).json({success: true, data: ci});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// ci update
const ciUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The ci update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const ci = req.body;
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        tags['update_user']=userid;

        const oldCi = await CiModel.findOneAndUpdate({id: ci.id}, ci);
        // after updating the ci, we need to get the ci object data.
        var dict={};
        for(const i in Object.keys(ci)){
            var datum=Object.keys(ci)[i];
            if (datum!='__v'){
                dict[datum]=ci[datum];}
            
        }

        //dict returns the apps information
        const data = Object.assign(oldCi, ci);
        logger.info(`update ci successful, ci_url: ${ci.ci_url}, ciId: ${ci.id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// ci delete by url
const ciDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The ci delete by ci_url controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {ci_url} = req.body;
        const ci = await CiModel.findOne({ci_url});
        if(ci){
            await CiModel.deleteOne({ci_url: ci_url});
            logger.info(`delete ci successful, ${ci_url}`);
            return res.status(200).json({success: true, message: ci_url + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: ci_url + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// ci delete by ID
const ciDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The ci delete by id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const ci = await CiModel.findOne({id});
        if(ci){
            await CiModel.deleteOne({id: id});
            logger.info(`delete ci successful, ${id}`);
            return res.status(200).json({success: true, message: ci.ci_url + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: ci.ci_url + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// fetch information of the ci
const ciGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The ci info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const ci = await CiModel.findOne({id});
        if(ci){
            return res.status(200).json({success:true, data: ci});
        }
        else{
            return res.status(404).json({success:false,errors:[{msg:id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};


module.exports = {
    ciAdd,
    ciUpdate,
    ciDelete,
    ciDeleteById,
    ciGet
};
