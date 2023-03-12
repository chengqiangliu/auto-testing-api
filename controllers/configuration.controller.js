const path = require('path');

const ConfigurationModel = require("../models/ConfigurationModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding an application
const configurationAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {key} = req.body
        // if key already exists, return error or else create a new apps
        const configuration = await ConfigurationModel.findOne({key});
        logger.info(configuration);
        if (configuration) {
            logger.warn(`the key already exists, ${configuration.key}`);
            return res.status(400).json({success: false, errors: {errormessage:'Configuration already exists',errorcode:'400'}});
        } else { 
            await ConfigurationModel.create({...req.body});
            const configuration = await ConfigurationModel.findOne({key});
            logger.info(configuration)
            logger.info(`add configuration successful, ${configuration.key}`);
            return res.status(200).json({success: true, data: configuration});
        }
    } catch (err) {
        logger.error(`add configuration failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'add configuration failed, system error!',errorcode:'500'}});
    }
};

// configuration update
const configurationUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const configuration = req.body;
        logger.info(configuration);
        const oldConfiguration = await ConfigurationModel.findOneAndUpdate({_id: configuration._id}, configuration);
        // after updating the configuration, we need to get the configuration object data.
        var dict={};
        for(const i in Object.keys(configuration)){
            var datum=Object.keys(configuration)[i];
            if (datum!='__v'){
                dict[datum]=configuration[datum];}
            
        }

        //dict returns the configuration information
        const data = Object.assign(oldConfiguration, configuration);
        logger.info(`update configuration successful, key: ${configuration.key}, configurationId: ${configuration._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update configuration failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'update configuration failed, system error!',errorcode:'500'}});
    }
};

// configuration delete by key
const configurationDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration delete by key controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {key} = req.body;
        const configuration = await ConfigurationModel.findOne({key});
        if(configuration){
            await ConfigurationModel.deleteOne({key: key});
            logger.info(`delete configuration successful, ${key}`);
            return res.status(200).json({success: true, message: key + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: key + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete configuration failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete configuration failed, system error!', errorcode: '500'}]});
    }
};

// configuration delete by ID
const configurationDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration delete by _id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {_id} = req.body;
        const configuration = await ConfigurationModel.findOne({_id});
        if(configuration){
            await ConfigurationModel.deleteOne({_id: _id});
            logger.info(`delete configuration successful, ${_id}`);
            return res.status(200).json({success: true, message: configuration.key + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: configuration.key + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete configuration failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete configuration failed, system error!', errorcode: '500'}]});
    }
};

// fetch information of the configuration
const configurationGetInfo = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {_id} = req.body;
        const configuration = await ConfigurationModel.findOne({_id});
        if(configuration){
            return res.status(200).json({success:true, data: configuration});
        }
        else{
            return res.status(404).json({success:false,errors:[{msg:_id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(`get configuration info failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['get configuration info failed, system error!']});
    }
};


module.exports = {
    configurationAdd,
    configurationUpdate,
    configurationDelete,
    configurationDeleteById,
    configurationGetInfo
};