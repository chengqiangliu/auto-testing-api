const md5 = require("blueimp-md5");
const path = require('path');
const moment = require("moment");

const DeviceModel = require("../models/DeviceModel");
const { validate } = require("./common.controller");
const UserModel = require('../models/UserModel');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');
const {autho} = require('../auth/index')

//add a device
const deviceAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device add controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read req parameter data
        const {device_name} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        // if username already exists, return error or else create a new user

        const device = await DeviceModel.findOne({device_name});
        if (device) {
            logger.warn(`the device id already exists, ${device.device_name}`);
            return res.status(400).json({success: false, errors: {message:'device already exists',code:'400'}});
        } else { 
            const device = await DeviceModel.create({create_user:userid,update_user:userid,...req.body});
            logger.info('add device successful ' + device_name);
            return res.status(200).json({success: true, data: device});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

//device update
const deviceUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const device = req.body;
        const date = new Date();
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
        device.update_time = formattedDate; 
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        device['update_user']=userid;

        const olddevice = await DeviceModel.findOneAndUpdate({device_name: device.device_name}, device);

        logger.info(`update device successful, ${device.device_name}`);
        return res.status(200).json({success: true, data:device});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// Device delete
const deviceDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const device = await DeviceModel.findOne({id});
        if(device){
            await DeviceModel.deleteOne({id: id});
            logger.info(`delete device successful, ${id}`);
            return res.status(200).json({success: true, message: id + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: id + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

//Get device information
const deviceGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device get controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const device = await DeviceModel.findOne({id});
        if(device){
            return res.status(200).json({success: true, data: device});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: device.device_name + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

module.exports = { deviceAdd, deviceUpdate, deviceDelete, deviceGet };
