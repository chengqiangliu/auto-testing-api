const path = require('path');

const ResultsModel = require("../models/ResultsModel");
const UserModel = require('../models/UserModel');
const ErrorsModel = require("../models/ErrorsModel");
const RunsModel = require("../models/RunsModel");
const CasesModel = require("../models/CasesModel");
const { validate } = require('./common.controller');
const {autho} = require('../auth/index')

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;
const errorStatements = require('../lib/errorStatements');

// adding a results
const resultsAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The resultss add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // read request parameter data
        const results = req.body
        const Rerror = await ErrorsModel.findOne({_id:results.error});
        const Rruns = await RunsModel.findOne({_id:results.run})
        const Rcases= await CasesModel.findOne({_id:results.case})

        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id

        if(Rerror && Rcases && Rruns){
            // if results already exists, return error or else create a new result
            const result = await ResultsModel.findOne({error:results.error,case:results.case,run:results.run});
            if (result) {
                logger.warn(`the result already exists`);
                return res.status(400).json({success: false, error: {message:'result already exists',code:'400'}});
            } else { 
                await ResultsModel.create({create_user:userid,update_user:userid,...req.body});
                const result = await ResultsModel.findOne({error:results.error,case:results.case,run:results.run});
                logger.info(`add results successful`);
                return res.status(200).json({success: true, data: result});
            }
        } else {
            
            logger.info(`add results failed, all required input data doesn't exist`);
            return res.status(500).json({success: false, error: {message: 'add results failed, all required input data doesnt exist',code:'500'}});
           
        }
        
    } catch (err) {
        logger.error(`add results failed, system error。${err}`);
        return res.status(500).json({success: false, error: {message: 'add resultss failed, system error!',code:'500'}});
    }
};

// results update
const resultsUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The results update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const results = req.body;

        let Rerror = 1;
        if ('error' in results){
            logger.info('error attribute is present')
            Rerror = await ErrorsModel.findOne({_id:results.error});
            
        }
        let Rruns = 1;
        if('run' in results){
            logger.info('runs attribute is present')
            Rruns = await RunsModel.findOne({_id:results.run})
        } 
        let Rcases=1;
        if('case' in results){
            logger.info('cases attribute is present')
            Rcases= await CasesModel.findOne({_id:results.case})
        }
        
        //accesstoken checking
        const username = autho(req)
        let user = await UserModel.findOne({username:username});
        let userid = user._id
        results['update_user']=userid;

        if(Rerror && Rcases && Rruns){
        const oldresults = await ResultsModel.findOneAndUpdate({_id: results.id}, results);
        // after updating the results, we need to get the results object data.
        var dict={};
        for(const i in Object.keys(results)){
            var datum=Object.keys(results)[i];
            if (datum!='__v'){
                dict[datum]=results[datum];}
            
        }

        //dict returns the apps information
        const data = Object.assign(oldresults, results);
        logger.info(`update results successful`);
        return res.status(200).json({success: true, data: data});
    } else {
        logger.info('one of required attributes doesnt exist in the parent table');
    }
    } catch (err) {
       logger.info(`add results failed, all required input data doesn't exist`);
            return res.status(500).json({success: false, error: {message: 'add results failed, all required input data doesnt exist',code:'500'}});
    }
};

// results delete by ID
const resultsDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The results delete by _id controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {id} = req.body;
        const results = await ResultsModel.findOne({id});
        if(results){
            await ResultsModel.deleteOne({_id: id});
            logger.info(`delete results successful, ${id}`);
            return res.status(200).json({success: true, message: results._id + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: results._id + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.info(`add results failed, all required input data doesn't exist`);
         return res.status(500).json({success: false, error: {message: 'add results failed, all required input data doesnt exist',code:'500'}});
    }
};

// fetch information of the results
const resultsGetInfo = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The results info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {id} = req.body;
        const results = await ResultsModel.findOne({_id:id});
        const errors = await ErrorsModel.findOne({_id:results.error})
        const runs = await RunsModel.findOne({_id:results.run})
        const cases = await CasesModel.findOne({_id:results.case})
        if(results){
            return res.status(200).json({success:true, data: {id:results._id,error:errors,run:runs,case:cases,status:results.status}});
        }
        else{
            return res.status(404).json({success:false,error:[{msg:id+'does not exist',code:"404"}]});
        }
    } catch (err) {
       logger.info(`add results failed, all required input data doesn't exist`);
        return res.status(500).json({success: false, error: {message: 'add results failed, all required input data doesnt exist',code:'500'}});
    }
};


module.exports = {
    resultsAdd,
    resultsUpdate,
    resultsDeleteById,
    resultsGetInfo
};
