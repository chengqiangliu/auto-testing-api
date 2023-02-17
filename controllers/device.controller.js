const md5 = require("blueimp-md5");
const path = require('path');
const moment = require("moment");

const UserModel = require("../models/UserModel");
const DeviceModel = require("../models/DeviceModel");
const RoleModel = require("../models/RoleModel");
const ClientModel = require("../models/ClientModel");
const RefreshTokenModel = require("../models/RefreshTokenModel");

const Constants = require('../lib/constants');
const { validate } = require("./common.controller");
const logger = require('../lib/logger').API;
const { generateToken } = require('../auth');

//user functionalities
//user login
/*const userLogin = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user login controller is started');
    try {
        // validation
        const validateResult = validate(req, true);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        let {username, password} = req.body;
       
        //if username exists fetch the user information, if it doesn't exist and given username is admin, create a user named admin or else return an error
        let user = await UserModel.findOne({username, password: md5(password)});
        if (!user && username === 'admin') {
            password = 'Admin1@'
            await UserModel.create({username: 'admin', password: md5(password), clientId: '9999'});
            logger.info('初始化用户: 用户名: admin 密码为: admin');
            user = await UserModel.findOne({username, password: md5(password)});
        }

        if(user) {
            logger.info("user exists")
            //commenting client because there is no client.route and client.validation
            //const client = await ClientModel.findOne({clientId: user.clientId});
            //if case should contain if(client),but since client related data is not present, for now we are assuming that we have a client
            // with the same clientID as the user, hence if(1)
            if(1) {
                const accessToken = generateToken({userId: user._id, createTime: new Date()}, 'AccessToken');
                const refreshToken = generateToken({userId: user._id, createTime: new Date()}, 'RefreshToken');
                await RefreshTokenModel.create({refreshToken, clientId: user.clientId, userId: user._id});
                if (user.role_id) {
                    const role = await RoleModel.findOne({_id: user.role_id});
                    logger.info(`login success, ${user.username}`);
                    return res.status(200).json({success: true, data: {username,accessToken, refreshToken}});
                } else {
                    const role= {menus: []}
                    //returns login success information with the username
                    logger.info(`login successful, ${user.username}`);
                    return res.status(200).json({success: true, data: {username, accessToken, refreshToken}});
                }
            } else {
                //when checking for the client, if the clientID is not same for the client and user then this else statement is true.
                logger.warn('login failed, clientId is wrong。');
                return res.status(400).json({success: false, errors: ['clientId is wrong!']});
            }
        } else {
            // login failed
            logger.warn('login failed, username or password is wrong。');
            return res.status(400).json({success: false, errors: {errormessage:'login failed, username or password is wrong。',errorcode:'400'}});
        }
       
    } catch (err) {
        logger.error(`login failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage:'login failed, system error',errorcode:'500'}});
    }
};*/

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
        const {deviceName, model, create_user} = req.body
        // if username already exists, return error or else create a new user
        
        const device = await DeviceModel.findOne({deviceName});
        //logger.info(device);
        if (device) {
            logger.warn(`the device id already exists, ${device.deviceName}`);
            return res.status(400).json({success: false, errors: {message:'device already exists',code:'400'}});
        } else { 
            const device = await DeviceModel.create({...req.body});
            
            //const user = await UserModel.findOne({username});
            //logger.info(device);
            logger.info('add device successful ' + deviceName);
            return res.status(200).json({success: true, data: device});
        }
    } catch (err) {
        logger.error(`add device failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage:'error, system error!',errorcode:'500'}});
    }
};

//user update
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
        const olddevice = await DeviceModel.findOneAndUpdate({deviceName: device.deviceName}, device);
        
        logger.info(`update device successful, ${device.deviceName}`);
        return res.status(200).json({success: true, data:device});
    } catch (err) {
        logger.error(`update device failed, system error。${err}`);
        return res.status(500).json({success: false, errors: {errormessage:'update device failed,system error',errorcode:'500'}});
    }
};

// 删除用户
const deviceDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The devive delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {deviceName} = req.body;
        const device = await DeviceModel.findOne({deviceName});
        if(device){
            await DeviceModel.deleteOne({deviceName: deviceName});
            logger.info(`delete device successful, ${deviceName}`);
            return res.status(200).json({success: true, message: deviceName + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: deviceName + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(`delete device failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'System error, please try again!', code: '500'}]});
    }
};

const deviceGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device get controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {deviceName} = req.body;
        const device = await DeviceModel.findOne({deviceName});
        if(device){
            return res.status(200).json({success: true, data: device});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: deviceName + ' does not exist', code: "404"}] });
        }
    } catch (err) {
        logger.error(`get device failed, system error。${err}`);
        return res.status(500).json({success: false, errors:[{ msg: 'System error, please try again!', code: '500'}]});
    }
};

/*const userDeleteById = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user delete by ClientId controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }
        const {clientId} = req.body;
        const user = await UserModel.findOne({clientId});
        //console.log(user);
        if(user){
            await UserModel.deleteOne({clientId:clientId});
            logger.info(`delete user successful, ${clientId}`);
            return res.status(200).json({success: true, message: clientId + ' successfully deleted'});
        }
        else{
            return res.status(404).json({success: false, error:[ {msg: clientId + ' does not exist', errorcode: "404"}] });
        }
    } catch (err) {
        logger.error(`delete user failed, system error。${err}`);
         return res.status(500).json({success: false, errors:[{ msg: '用户删除异常, 请重新尝试!', errorcode: '500'}]});
    }
};*/

//list all the users that are present
/*const deviceGet = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The device get controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const users = await UserModel.find({username: {'$ne': 'admin'}});
        //the following line can be uncommented if the users have roles defined
        //const roles = await RoleModel.find();
 
        //dict consists the infomration of all the users without the password included for returning as output
        var dict={};
        for(const i in Object.keys(users)){
            var datum=users[i];
            var dic={};
            for(const j in Object.keys(datum)){
            var dat=Object.keys(datum)[j];
            
            if(dat=='_doc'){
                for(const k in Object.keys(datum[dat])){
                var dat1= Object.keys(datum[dat])[k];
                if (dat1!='password' && dat1!="__v"){
                    dic[dat1]=datum[dat1];}
                }
                
            }
            }
            
        dict[i]=dic;  
            
        }
    
        logger.info(`get user list successful.`);
        return res.status(200).json({success: true, data: Object.values(dict)});
    } catch (err) {
        logger.error(`get user list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['Get user list exception, please try again!']});
    }
};*/

module.exports = { deviceAdd, deviceUpdate, deviceDelete, deviceGet };
