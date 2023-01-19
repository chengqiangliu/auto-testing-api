const path = require('path');

const RoleModel = require("../models/RoleModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// 添加角色
const roleAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The role add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const { roleName } = req.body

        // 处理: 判断角色是否已经存在, 如果存在, 返回提示错误的信息, 如果不存在, 保存
        // 查询(根据rolename)
        const role = await RoleModel.create({name: roleName});

        logger.info(`add role successful, ${roleName}`);
        return res.status(200).json({success: true, data: role});
    } catch (err) {
        logger.error(`add role failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加角色异常, 请重新尝试!']});
    }
};

// 更新角色
const roleUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The role update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const role = req.body;
        role.auth_time = Date.now();
        const oldRole = await RoleModel.findOneAndUpdate({_id: role._id}, role);

        // 返回
        logger.info(`update role successful, ${role.roleName}`);
        return res.status(200).json({success: true, data: {...oldRole._doc, ...role}});
    } catch (err) {
        logger.error(`update role failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['修改角色异常, 请重新尝试!']});
    }
};

// 删除角色
const roleDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The role delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {roleId} = req.body;
        await RoleModel.deleteOne({_id: roleId});

        logger.info(`delete role successful, ${roleId}`);
        return res.status(200).json({success: true});
    } catch (err) {
        logger.error(`delete role failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['角色删除异常, 请重新尝试!']});
    }
};

// 获取所有角色列表
const roleList = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The role list controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const roles = await RoleModel.find();

        logger.info(`get role list successful.`);
        return res.status(200).json({success: true, data: {roles}});
    } catch (err) {
        logger.error(`get role list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取角色列表异常, 请重新尝试!']});
    }
};

module.exports = { roleAdd, roleUpdate, roleDelete, roleList };