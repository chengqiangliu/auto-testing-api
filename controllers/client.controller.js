const path = require('path');
const ClientModel = require("../models/ClientModel");
const Constants = require('../lib/constants');
const { validate } = require("./common.controller");
const logger = require('../lib/logger').API;

// 添加客户
const clientAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The client add controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const client = req.body
        // 处理: 判断客户是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
        // 查询(根据clientname)
        const clientFromDb = await ClientModel.findOne({_id: client.clientId});
        if (clientFromDb) {
            // 返回提示错误的信息
            logger.warn(`the clientname already exists, ${client.clientname}`);
            return res.status(400).json({success: false, errors: ['此客户已存在!']});
        } else { // 没值(不存在)
            // 保存
            ClientModel.create(client);

            logger.info(`add client successful, ${client.clientname}`);
            return res.status(200).json({success: true, data: client});
        }
    } catch (err) {
        logger.error(`add client failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加客户异常, 请重新尝试!']});
    }
};

// 更新客户
const clientUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The client update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const client = req.body;
        const oldClient = await ClientModel.findOneAndUpdate({_id: client._id}, client);
        const data = Object.assign(oldClient, client);
        // 返回
        logger.info(`update client successful, ${client.clientname}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update client failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['修改客户异常, 请重新尝试!']});
    }
};

// 删除客户
const clientDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The client delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {clientId} = req.body;
        await ClientModel.deleteOne({_id: clientId});

        logger.info(`delete client successful, ${client.clientname}`);
        return res.status(200).json({success: true});
    } catch (err) {
        logger.error(`delete client failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['客户删除异常, 请重新尝试!']});
    }
};

// 获取所有客户列表
const clientList = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The client list controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const clients = await ClientModel.find({clientname: {'$ne': 'admin'}});
        const roles = await ClientModel.find();

        logger.info(`get client list successful.`);
        return res.status(200).json({success: true, data: {clients, roles}});
    } catch (err) {
        logger.error(`get client list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取客户列表异常, 请重新尝试!']});
    }
};

module.exports = { clientAdd, clientUpdate, clientDelete, clientList };