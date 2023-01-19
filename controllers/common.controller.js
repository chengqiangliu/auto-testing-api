const { validationResult } = require("express-validator");
const logger = require('../lib/logger').API;

const validate = (req, isLogin=false) => {

    const errors = validationResult(req);

    // if there is error then return Error
    if (!errors.isEmpty()) {
        logger.warn(`Validation error, the error is ${JSON.stringify(errors.array())}`);
        return {
            success: false,
            status: 400,
            errors: errors,
        };
    }

    return {
        success: true,
    };
};

module.exports = { validate };