const { expressjwt } = require('express-jwt');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');
const logger = require('../lib/logger').API;

const generateToken = (payload, type) => {
    logger.info('The generateToken started');
    if (type === 'AccessToken') {
        return jwt.sign(payload, secret, {expiresIn: "600s"});
    } else {
        return jwt.sign(payload, secret, {expiresIn: "24h"});
    }
}

// 验证--放到最前面的use
const verifyToken = () => {
    return expressjwt({
        secret: secret,
        algorithms: ["HS256"],
    }).unless({ path: ["/api/user/login"] })
};

const verifyRefreshToken = async (refreshToken) => {
    jwt.verify(refreshToken, secret, (err, user) => {
        if (err) {
            return {
                status: 'UnauthorizedError',
                errors: ['The refreshToken is invalid'],
            };
        }
        const accessToken = generateToken({ userId: user.userId,  createTime: new Date()}, 'AccessToken');
        return {
            status: 'success',
            accessToken
        };
    });
};

// Error Token Handler--放到最后一个app.use()
const errorTokenHandler = (err, req, res, next) => {
    logger.info('The ErrorTokenHandler started');
    if (err.name === 'UnauthorizedError') {
        //  这个需要根据自己的业务逻辑来处理（ 具体的err值 请看下面）
        let data = {};
        data.msg = 'Token Validation Failed';
        data.error = err;

        res.status(401).json({success: false, data});
    }
};

module.exports = {
    generateToken,
    verifyToken,
    verifyRefreshToken,
    errorTokenHandler
};