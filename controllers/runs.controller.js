const path = require('path');

const RunsModel = require("../models/RunsModel");
const JobsModel = require("../models/JobsModel");
const { validate } = require('./common.controller');
const UserModel = require('../models/UserModel');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');
const {autho} = require('../auth/index')

// adding 
const runsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The runs add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {job_id} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user.id

        const jobs = await JobsModel.findOne({id:job_id});
        if(jobs){
            // if job_id already exists, return error or else create a new runs
            const runs = await RunsModel.findOne({job_id:job_id});
            if (runs) {
                logger.warn(`the runs already exists`);
                return res.status(400).json({success: false, error: {message:'runs already exists',code:'400'}});
            } else { 
                await RunsModel.create({create_user:userid,update_user:userid,...req.body});
                const runs = await RunsModel.findOne({job_id:job_id});
                logger.info(`add runs successful`);
                return res.status(200).json({success: true, data: {id: runs.id, jobs, created_at: runs.created_at, finished_at: runs.finished_at, total: runs.total, status: runs.status, create_user: runs.create_user, update_user: runs.update_user, create_time: runs.create_time, update_time: runs.update_time}});
            }
        } else {
            if(jobs!=null){
                logger.info(`add runs failed, job_id doesn't exist`);
                return res.status(500).json({success: false, error: {message: 'add runs failed due to nonexistent job_id!',code:'500'}});
    
            }
        }
        
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};


// runs delete by ID
const runsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The runs delete by id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const runs = await RunsModel.findOne({id});
        if(runs){
            await RunsModel.deleteOne({id: id});
            logger.info(`delete runs successful, ${id}`);
            return res.status(200).json({success: true, message: runs.job_id + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: runs.job_id + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// fetch information of the runs
const runsGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The runs get controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const runs = await RunsModel.findOne({id});
        const job_id = runs.job_id;
        const jobs = await JobsModel.findOne({id:job_id});
        if(runs){
            return res.status(200).json({success:true, data: {id: runs.id, jobs, created_at: runs.created_at, finished_at: runs.finished_at, total: runs.total, status: runs.status, create_user: runs.create_user, update_user: runs.update_user, create_time: runs.create_time, update_time: runs.update_time}});
        }
        else{
            return res.status(404).json({success:false,error:[{msg:id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};


module.exports = {
    runsAdd,
    runsDeleteById,
    runsGet
};
