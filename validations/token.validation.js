const { body } = require("express-validator");

const getAccessTokenValidator = () => {
    return [
        body("refreshToken")
            .exists({ checkFalsy: true })
            .withMessage("RefreshToken is required")
            .isString()
            .withMessage("User name should be string"),
    ];
}

module.exports = {
    getAccessTokenValidator,
};