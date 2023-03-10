const path = require('path');

const ErrorsModel = require("../models/ErrorsModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// adding a new tag
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
        // if errorsname already exists, return error or else create new errors
        let errors = await ErrorsModel.findOne({type,message});
        if (errors) {
            logger.warn(`error type and message already exist`);
            return res.status(400).json({success: false, errors: {errormessage:'error already exists',errorcode:'400'}});
        } else { 
            await ErrorsModel.create({...req.body});
            const errors = await ErrorsModel.findOne({type,message});
            logger.info(`add error successful, ${type,message}`);
            return res.status(200).json({success: true, data:{type,message}});
        }
    } catch (err) {
        logger.error(`add error failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'add error failed, system error!',errorcode:'500'}});
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
        logger.info(`update errors successful, TagName: ${errors.errorsname}, tagId: ${errors._id}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update errors failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage: 'update errors failed, system error!',errorcode:'500'}});
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
        const {_id} = req.body;
        const errors = await ErrorsModel.findOne({_id});
        if(errors){
            await ErrorsModel.deleteOne({_id: _id});
            logger.info(`delete errors successful, ${_id}`);
            return res.status(200).json({success: true, message:' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg:'tag ID does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete errors failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'delete errors failed, system error!', errorcode: '500'}]});
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

        const {_id} = req.body;
        const errors = await ErrorsModel.findOne({_id});
        if(errors){
            return res.status(200).json({success:true, data: errors});
        }
        else{
            return res.status(404).json({success:false,errors:[{msg:_id+'does not exist',code:"404"}]});
        }
    } catch (err) {
        logger.error(`get errors info failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['get errors info failed, system error!']});
    }
};
module.exports = {
    errorsAdd,
    errorsUpdate,
    errorsDeleteById,
    errorsGet
};
