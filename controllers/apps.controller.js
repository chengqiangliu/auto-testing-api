const path = require('path');

const AppsModel = require("../models/AppsModel");
const { validate } = require('./common.controller');
const UserModel = require('../models/UserModel');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');
const {autho} = require('../auth/index')

// adding an application
const appsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const {apps_name} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        // if apps_name already exists, return error or else create a new apps
        const apps = await AppsModel.findOne({apps_name});
        if (apps) {
            logger.warn(`the Application name already exists, ${apps.apps_name}`);
            return res.status(400).json({success: false, errors: {errormessage:'Application already exists',errorcode:'400'}});
        } else { 
            await AppsModel.create({create_user:userid,update_user:userid,...req.body});
            const apps = await AppsModel.findOne({apps_name});
            logger.info(apps)
            logger.info(`add apps successful, ${apps.apps_name}`);
            return res.status(200).json({success: true, data: apps});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// apps update
const appsUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const apps = req.body;
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        apps['update_user']=userid;
        const oldApps = await AppsModel.findOneAndUpdate({id: apps.id}, apps);
        // after updating the apps, we need to get the apps object data.
        var dict={};
        for(const i in Object.keys(apps)){
            var datum=Object.keys(apps)[i];
            if (datum!='__v'){
                dict[datum]=apps[datum];}
            
        }

        //dict returns the apps information
        const data = Object.assign(oldApps, apps);
        logger.info(`update apps successful, apps_name: ${apps.apps_name}, appsId: ${apps.id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// apps delete by name
const appsDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps delete by apps_name controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {apps_name} = req.body;
        const apps = await AppsModel.findOne({apps_name});
        if(apps){
            await AppsModel.deleteOne({apps_name: apps_name});
            logger.info(`delete apps successful, ${apps_name}`);
            return res.status(200).json({success: true, message: apps_name + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: apps_name + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// apps delete by ID
const appsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps delete by Apps Id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const apps = await AppsModel.findOne({id});
        if(apps){
            await AppsModel.deleteOne({id: id});
            logger.info(`delete apps successful, ${id}`);
            return res.status(200).json({success: true, message: apps.apps_name + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: apps.apps_name + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// fetch information of the applications
const appsGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The apps info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const apps = await AppsModel.findOne({id});
        if(apps){
            return res.status(200).json({success:true, data: apps});
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
    appsAdd,
    appsUpdate,
    appsDelete,
    appsDeleteById,
    appsGet
};
