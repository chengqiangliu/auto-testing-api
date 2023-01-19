const path = require('path');

const RefreshTokenModel = require("../models/RefreshTokenModel");

const Constants = require('../lib/constants');
const { validate } = require("./common.controller");
const logger = require('../lib/logger').API;
const { verifyRefreshToken } = require('../auth');

// 获得Access Token
const getAccessToken = async (req, res, next) => {
    logger.addContext(Constants.FILE_NAME, path.basename(__filename));
    logger.info('The get Access Token controller is started');
    try {
        // validation
        const validateResult = validate(req);
        if (!validateResult.success) {
            return res.status(validateResult.status).json({success: false, errors: validateResult.errors});
        }

        // 读取请求参数数据
        const { refreshToken } = req.body;

        const refreshTokenFromDb = await RefreshTokenModel.findOne({refreshToken});
        if (refreshTokenFromDb) {
            logger.warn(`verify the refresh token is valid or not`);

            const validateResult = verifyRefreshToken(refreshToken);
            if (validateResult.status === 'UnauthorizedError') {
                return res.status(403).json({success: false, errors: ['The refreshToken is invalid']});
            } else {
                return res.status(200).json({success: true, accessToken: validateResult.accessToken});
            }
        } else { // 没值(不存在)
            logger.info(`The refreshToken does not exist`);
            return res.status(403).json({success: false, errors: ['The refreshToken does not exist']});
        }
    } catch (err) {
        logger.error(`add user failed, system error。${err}`);
        return res.status(500).json({success: false, errors: ['添加用户异常, 请重新尝试!']});
    }
};

module.exports = { getAccessToken };