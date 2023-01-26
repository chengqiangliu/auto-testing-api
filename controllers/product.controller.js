const path = require('path');

const ProductModel = require("../models/ProductModel");
const { validate } = require('./common.controller');

const Constants = require('../lib/constants');
const logger = require('../lib/logger').API;

// 添加产品
const productAdd = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The product add controller is started');

    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const product = req.body
        await ProductModel.create(product);

        logger.info(`add product successful, productName: ${product.name}`);
        return res.status(200).json({success: true, data: product});
    } catch (err) {
        logger.error(`add product failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加产品异常, 请重新尝试!']});
    }
};

// 更新产品
const productUpdate = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The product update controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const {productId, productName} = req.body
        const oldProduct = await ProductModel.findOneAndUpdate({_id: productId}, {name: productName});

        // 返回
        const data = Object.assign(oldProduct, req.body)
        logger.info(`update product successful, productName: ${productName}, productId: ${productId}`);
        return res.status(200).json({success: true, data: data});
    } catch (err) {
        logger.error(`update product failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['修改产品异常, 请重新尝试!']});
    }
};

// 删除产品
const productDelete = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The product delete controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const productId = req.params.productId;
        await ProductModel.deleteOne({_id: productId});

        logger.info(`delete product successful, ${productId}`);
        return res.status(200).json({success: true});
    } catch (err) {
        logger.error(`delete product failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['产品删除异常, 请重新尝试!']});
    }
};

// 根据产品ID获取产品
const getProductInfo = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The product info controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const productId = req.query.productId
        const product = await ProductModel.findOne({_id: productId});

        logger.info(`get product info successful.`);
        return res.status(200).json({success: true, data: {product}});
    } catch (err) {
        logger.error(`get product info failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取产品信息异常, 请重新尝试!']});
    }
};

// 获取所有产品列表
const getProductList = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The product list controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        const categories = await ProductModel.find();

        logger.info(`get product list successful.`);
        return res.status(200).json({success: true, data: {categories}});
    } catch (err) {
        logger.error(`get product list failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['获取产品列表异常, 请重新尝试!']});
    }
};

module.exports = {
    productAdd,
    productUpdate,
    productDelete,
    getProductInfo,
    getProductList
};