const path = require('path');

const CategoryModel = require("../models/CategoryModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// 添加分类
const categoryAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The category add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const {categoryName, parentId} = req.body
        const category = await CategoryModel.create({name: categoryName, parentId: parentId || '0'});

        logger.info(`add category successful, categoryName: ${categoryName}, parentId: ${parentId}`);
        return res.status(200).json({success: true, data: category});
    } catch (err) {
        logger.error(`add category failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加分类异常, 请重新尝试!']});
    }
};

// 更新分类
const categoryUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The category update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {categoryId, categoryName} = req.body
        const oldCategory = await CategoryModel.findOneAndUpdate({_id: categoryId}, {name: categoryName});

        // 返回
        const data = Object.assign(oldCategory, req.body)
        logger.info(`update category successful, categoryName: ${categoryName}, categoryId: ${categoryId}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update category failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['修改分类异常, 请重新尝试!']});
    }
};

// 删除分类
const categoryDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The category delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const categoryId = req.params.categoryId;
        await CategoryModel.deleteOne({_id: categoryId});

        logger.info(`delete category successful, ${categoryId}`);
        return res.status(200).json({success: true});
    } catch (err) {
        logger.error(`delete category failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['分类删除异常, 请重新尝试!']});
    }
};

// 根据分类ID获取分类
const getCategoryInfo = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The category info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const categoryId = req.query.categoryId
        const category = await CategoryModel.findOne({_id: categoryId});

        logger.info(`get category info successful.`);
        return res.status(200).json({success: true, data: {category}});
    } catch (err) {
        logger.error(`get category info failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取分类信息异常, 请重新尝试!']});
    }
};

// 获取所有分类列表
const getCategoryList = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The category list controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const categories = await CategoryModel.find();

        logger.info(`get category list successful.`);
        return res.status(200).json({success: true, data: {categories}});
    } catch (err) {
        logger.error(`get category list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取分类列表异常, 请重新尝试!']});
    }
};

module.exports = {
    categoryAdd,
    categoryUpdate,
    categoryDelete,
    getCategoryInfo,
    getCategoryList
};