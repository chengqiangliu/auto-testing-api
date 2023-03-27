const path = require('path');

const ErrorsModel = require("../models/ErrorsModel");
const UserModel = require('../models/UserModel');
const { validate } = require('./common.controller');
const {autho} = require('../auth/index')

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding a new error
const errorsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The errors add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        let {type,message} = req.body
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        //let screenshot = req.file.path
        // if errorsname already exists, return error or else create new errors
        let errors = await ErrorsModel.findOne({type,message});
        if (errors) {
            logger.warn(`error type and message already exist`);
            return res.status(400).json({success: false, errors: {errormessage:'error already exists',errorcode:'400'}});
        } else { 
            await ErrorsModel.create({create_user:userid,update_user:userid,...req.body});
            const errors = await ErrorsModel.findOne({type,message});
            logger.info(`add error successful, ${type,message}`);
            return res.status(200).json({success: true, data:{type,message}});
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

// errors update
const errorsUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The errors update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const errors = req.body;

         //accesstoken checking
         const username = autho(req)
         let user = await UserModel.findOne({username:username});
         let userid = user._id
         errors['update_user']=userid;

        const olderrors = await ErrorsModel.findOneAndUpdate({_id: errors._id}, errors);

        // after updating the errors, we need to get the errors object data.
        var dict={};
        for(const i in Object.keys(errors)){
            var datum=Object.keys(errors)[i];
            if (datum!='__v'){
                dict[datum]=errors[datum];}
            
        }

        //dict returns the errors information
        const data = Object.assign(olderrors, errors);
        logger.info(`update errors successful, errorName: ${errors.errorsname}, errorId: ${errors._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
         return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};


// errors delete by ID
const errorsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The errors delete by errorsname controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const errors = await ErrorsModel.findOne({id});
        if(errors){
            await ErrorsModel.deleteOne({_id: id});
            logger.info(`delete errors successful, ${id}`);
            return res.status(200).json({success: true, message:' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'error ID does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(JSON.stringify(errorStatements.CatchBlockErr)+`${err}`);
        return res.status(500).json({success: false, error: [{message : (errorStatements.CatchBlockErr.split("|")[1]), code: 500}]});
    }
};

//fetch information of the errors
const errorsGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The errors info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const errors = await ErrorsModel.findOne({id});
        if(errors){
            return res.status(200).json({success:true, data: errors});
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
    errorsAdd,
    errorsUpdate,
    errorsDeleteById,
    errorsGet
};