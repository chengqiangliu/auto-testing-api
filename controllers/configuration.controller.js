const path = require('path');

const ConfigurationModel = require("../models/ConfigurationModel");
const { validate } = require('./common.controller');
const UserModel = require('../models/UserModel');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');
const {autho} = require('../auth/index')

// adding a configuration
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
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        // if key already exists, return error or else create a new apps
        const configuration = await ConfigurationModel.findOne({key});
        if (configuration) {
            logger.warn(`the key already exists, ${configuration.key}`);
            return res.status(400).json({success: false, error: {message:'Configuration already exists',code:'400'}});
        } else { 
            await ConfigurationModel.create({create_user:userid,update_user:userid,...req.body});
            const configuration = await ConfigurationModel.findOne({key});
            logger.info(`add configuration successful, ${configuration.key}`);
            return res.status(200).json({success: true, data: configuration});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
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
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        tags['update_user']=userid;
        
        const oldConfiguration = await ConfigurationModel.findOneAndUpdate({id: configuration.id}, configuration);
        // after updating the configuration, we need to get the configuration object data.
        var dict={};
        for(const i in Object.keys(configuration)){
            var datum=Object.keys(configuration)[i];
            if (datum!='__v'){
                dict[datum]=configuration[datum];}
            
        }

        //dict returns the configuration information
        const data = Object.assign(oldConfiguration, configuration);
        logger.info(`update configuration successful, key: ${configuration.key}, configurationId: ${configuration.id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
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
            return res.status(404).json({success: false, error:[ {msg: key + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// configuration delete by ID
const configurationDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration delete by id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const configuration = await ConfigurationModel.findOne({id});
        if(configuration){
            await ConfigurationModel.deleteOne({id: id});
            logger.info(`delete configuration successful, ${id}`);
            return res.status(200).json({success: true, message: configuration.key + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: configuration.key + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// fetch information of the configuration
const configurationGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The configuration info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const configuration = await ConfigurationModel.findOne({id});
        if(configuration){
            return res.status(200).json({success:true, data: configuration});
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
    configurationAdd,
    configurationUpdate,
    configurationDelete,
    configurationDeleteById,
    configurationGet
};
