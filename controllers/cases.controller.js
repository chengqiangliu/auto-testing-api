const path = require('path');

const CasesModel = require("../models/CasesModel");
const UserModel = require('../models/UserModel');
const { validate } = require('./common.controller');
const {autho} = require('../auth/index')
const errorStatements = require('../lib/errorStatements');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding a new case
const casesAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The cases add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        let {title,external_id} = req.body

         //accesstoken checking
         const username = autho(req)
         let user = await UserModel.findOne({username:username});
         let userid = user._id
         
        // if title already exists, return error or else create new cases
        let cases = await CasesModel.findOne({title,external_id});
        logger.info(cases);
        if (cases) {
            logger.warn(`case name already exists`);
            return res.status(400).json({success: false, errors: {errormessage:'case already exists',errorcode:'400'}});
        } else { 
            await CasesModel.create({create_user:userid,update_user:userid,...req.body});
            const cases = await CasesModel.findOne({title,external_id});
            logger.info(cases)
            logger.info(`add case successful, ${title}`);
            return res.status(200).json({success: true, cases});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// cases update
const casesUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The cases update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const cases = req.body;

        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        cases['update_user']=userid;

       
        const oldCases = await CasesModel.findOneAndUpdate({_id: cases.id}, cases);
        // after updating the cases, we need to get the cases object data.
        var dict={};
        for(const i in Object.keys(cases)){
            var datum=Object.keys(cases)[i];
            if (datum!='__v'){
                dict[datum]=cases[datum];}
            
        }

        //dict returns the cases information
        const data = Object.assign(oldCases, cases);
        logger.info(`update cases successful, caseName: ${cases.title}, caseId: ${cases._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// cases delete by name
const casesDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The cases delete by title controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {title} = req.body;
        const cases = await CasesModel.findOne({title});
        if(cases){
            await CasesModel.deleteOne({title: title});
            logger.info(`delete case successful, ${title}`);
            return res.status(200).json({success: true, message: title + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: title + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// cases delete by ID
const casesDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The cases delete by title controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const cases = await CasesModel.findOne({id});
        if(cases){
            await CasesModel.deleteOne({_id: id});
            logger.info(`delete cases successful, ${id}`);
            return res.status(200).json({success: true, message:'successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'casename does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

//fetch information of the cases
const casesGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const cases = await CasesModel.findOne({_id:id});
        if(cases){
            return res.status(200).json({success:true, data: cases});
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
    casesAdd,
    casesUpdate,
    casesDelete,
    casesDeleteById,
    casesGet
};
