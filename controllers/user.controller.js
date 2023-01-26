const md5 = require("blueimp-md5");
const path = require('path');

const UserModel = require("../models/UserModel");
const RoleModel = require("../models/RoleModel");
const ClientModel = require("../models/ClientModel");
const RefreshTokenModel = require("../models/RefreshTokenModel");

const Constants = require('../lib/constants');
const { validate } = require("./common.controller");
const logger = require('../lib/logger').API;
const { generateToken } = require('../auth');

// 登陆
const userLogin = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user login controller is started');
    try {
        // validation
        const validateResult = validate(req, true);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        let {username, password} = req.body;

        // 根据username和password查询数据库users, 如果没有, 返回提示错误的信息, 如果有, 返回登陆成功信息(包含user)
        let user = await UserModel.findOne({username, password: md5(password)});
        if (!user && username === 'admin') {
            password = 'admin'
            await UserModel.create({username: 'admin', password: md5(password), clientId: '9999'});
            logger.info('初始化用户: 用户名: admin 密码为: admin');
            user = await UserModel.findOne({username, password: md5(password)});
        }

        if(user) {
            const client = await ClientModel.findOne({clientId: user.clientId});
            if(client) {
                const accessToken = generateToken({userId: user._id, createTime: new Date()}, 'AccessToken');
                const refreshToken = generateToken({userId: user._id, createTime: new Date()}, 'RefreshToken');
                await RefreshTokenModel.create({refreshToken, clientId: user.clientId, userId: user._id});
                if (user.role_id) {
                    const role = await RoleModel.findOne({_id: user.role_id});
                    logger.info(`login success, ${user.username}`);
                    return res.status(200).json({success: true, data: {id: user._id, username, role, accessToken, refreshToken}});
                } else {
                    const role= {menus: []}
                    // 返回登陆成功信息(包含user)
                    logger.info(`login successful, ${user.username}`);
                    return res.status(200).json({success: true, data: {id: user._id, username, role, accessToken, refreshToken}});
                }
            } else {
                logger.warn('login failed, clientId is wrong。');
                return res.status(400).json({success: false, errors: ['clientId不正确!']});
            }
        } else {
            // 登陆失败
            logger.warn('login failed, username or password is wrong。');
            return res.status(400).json({success: false, errors: ['用户名或密码不正确!']});
        }
    } catch (err) {
        logger.error(`login failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['登陆异常, 请重新尝试']});
    }
};

// 添加用户
const userAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user add controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const {username, password} = req.body
        // 处理: 判断用户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
        // 查询(根据username)
        const user = await UserModel.findOne({username});
        if (user) {
            // 返回提示错误的信息
            logger.warn(`the username already exists, ${user.username}`);
            return res.status(400).json({success: false, errors: ['此用户已存在!']});
        } else { // 没值(不存在)
            // 保存
            await UserModel.create({...req.body, password: md5(password)});

            logger.info(`add user successful, ${user.username}`);
            return res.status(200).json({success: true, data: user});
        }
    } catch (err) {
        logger.error(`add user failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加用户异常, 请重新尝试!']});
    }
};

// 更新用户
const userUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const user = req.body;
        const oldUser = await UserModel.findOneAndUpdate({_id: user._id}, user);
        const data = Object.assign(oldUser, user);
        // 返回
        logger.info(`update user successful, ${user.username}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update user failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['修改用户异常, 请重新尝试!']});
    }
};

// 删除用户
const userDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {userId} = req.body;
        await UserModel.deleteOne({_id: userId});

        logger.info(`delete user successful, ${user.username}`);
        return res.status(200).json({success: true});
    } catch (err) {
        logger.error(`delete user failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['用户删除异常, 请重新尝试!']});
    }
};

// 获取所有用户列表
const userList = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The user list controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const users = await UserModel.find({username: {'$ne': 'admin'}});
        const roles = await RoleModel.find();

        logger.info(`get user list successful.`);
        return res.status(200).json({success: true, data: {users, roles}});
    } catch (err) {
        logger.error(`get user list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取用户列表异常, 请重新尝试!']});
    }
};

module.exports = { userLogin, userAdd, userUpdate, userDelete, userList };