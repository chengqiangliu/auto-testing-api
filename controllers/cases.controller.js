const path = require('path');

const CasesModel = require("../models/CasesModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding a new tag
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
        // if title already exists, return error or else create new cases
        let cases = await CasesModel.findOne({title,external_id});
        if (cases) {
            logger.warn(`Tag name already exists`);
            return res.status(400).json({success: false, errors: {errormessage:'Tag already exists',errorcode:'400'}});
        } else { 
            await CasesModel.create({...req.body});
            const cases = await CasesModel.findOne({title,external_id});
            logger.info(`add tag successful, ${title}`);
            return res.status(200).json({success: true, data:{title: title,external_id:external_id}});
        }
    } catch (err) {
        logger.error(`add tag failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'add tag failed, system error!',errorcode:'500'}});
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
        //logger.info(apps);
        const oldCases = await CasesModel.findOneAndUpdate({_id: cases._id}, cases);
        // after updating the cases, we need to get the cases object data.
        var dict={};
        for(const i in Object.keys(cases)){
            var datum=Object.keys(cases)[i];
            if (datum!='__v'){
                dict[datum]=cases[datum];}
            
        }

        //dict returns the cases information
        const data = Object.assign(oldCases, cases);
        logger.info(`update cases successful, TagName: ${cases.title}, caseId: ${cases._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update cases failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'update cases failed, system error!',errorcode:'500'}});
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
            logger.info(`delete tag successful, ${title}`);
            return res.status(200).json({success: true, message: title + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: title + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete cases failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete cases failed, system error!', errorcode: '500'}]});
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
        const {_id} = req.body;
        const cases = await CasesModel.findOne({_id});
        if(cases){
            await CasesModel.deleteOne({_id: _id});
            logger.info(`delete cases successful, ${_id}`);
            return res.status(200).json({success: true, message:' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'tagname does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete cases failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete cases failed, system error!', errorcode: '500'}]});
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

        const {_id} = req.body;
        const cases = await CasesModel.findOne({_id});
        if(cases){
            return res.status(200).json({success:true, data: cases});
        }
        else{
            return res.status(404).json({success:false,errors:[{msg:_id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(`get cases info failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['get cases info failed, system error!']});
    }
};


module.exports = {
    casesAdd,
    casesUpdate,
    casesDelete,
    casesDeleteById,
    casesGet
};
