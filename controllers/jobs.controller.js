const path = require('path');

const JobsModel = require("../models/JobsModel");
const AppsModel = require("../models/AppsModel");
const DeviceModel = require("../models/DeviceModel");
const CiModel = require("../models/CiModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');

// adding a jobs
const jobsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The jobs add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {app_id,device_id,ci_id} = req.body
        const apps = await AppsModel.findOne({_id:app_id});
        const device= await DeviceModel.findOne({_id:device_id});
        const ci= await CiModel.findOne({_id:ci_id});
        if(apps && device && ci){
            // if app_id, device_id, and ci_id already exists, return error or else create a new jobs
            const jobs = await JobsModel.findOne({app_id:app_id,device_id:device_id,ci_id:ci_id});
            if (jobs) {
                logger.warn(`the jobs already exists`);
                return res.status(400).json({success: false, error: {message:'jobs already exists',code:'400'}});
            } else { 
                await JobsModel.create({...req.body});
                const jobs = await JobsModel.findOne({app_id:app_id,device_id:device_id,ci_id:ci_id});
                logger.info(`add jobs successful`);
                return res.status(200).json({success: true, data: {id: jobs._id, apps, device, ci, environment: jobs.environment, started_at: jobs.started_at, finished_at: jobs.finished_at, status: jobs.status, create_time: jobs.create_time}});
            }
        } else {
            if(apps!=null || device!=null || ci!=null){
                logger.info(`add jobs failed,app_id or device_id or ci_id doesn't exist`);
                return res.status(500).json({success: false, error: {message: 'add jobs failed due to nonexistent app_id or device_id or ci_id!',code:'500'}});
    
            }
        }
        
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.message), code: 500}]});
    }
};

// jobs delete by ID
const jobsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The jobs delete by _id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const jobs = await JobsModel.findOne({id});
        if(jobs){
            await JobsModel.deleteOne({id: id});
            logger.info(`delete jobs successful, ${id}`);
            return res.status(200).json({success: true, message: jobs.app_id + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: jobs.app_id + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.message), code: 500}]});
    }
};

// fetch information of the jobs
const jobsGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The jobs get controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body
        const jobs = await JobsModel.findOne({id});
        const app_id = jobs.app_id;
        const device_id = jobs.device_id;
        const ci_id = jobs.ci_id;
        const apps = await AppsModel.findOne({app_id});
        const device= await DeviceModel.findOne({device_id});
        const ci= await CiModel.findOne({ci_id});
        
        if(jobs){
            return res.status(200).json({success:true, data: {id: jobs.id, apps, device, ci, environment: jobs.environment, started_at: jobs.started_at, finished_at: jobs.finished_at, status: jobs.status, create_time: jobs.create_time}});
        }
        else{
            return res.status(404).json({success:false,error:[{msg:id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.message), code: 500}]});
    }
};


module.exports = {
    jobsAdd,
    jobsDeleteById,
    jobsGet
};