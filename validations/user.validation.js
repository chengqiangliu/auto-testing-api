const { body } = require("express-validator");

const userLoginValidator = () => {
    return [
        body("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        body("password")
            .exists()
            .withMessage("Password is required")
            .isString()
            .withMessage("Password should be string")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
    ]
};

const userAddValidator = () => {
    return [
        body("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        body("password")
            .exists()
            .withMessage("Password is required")
            .isString()
            .withMessage("Password should be string")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
        body("email").optional().isEmail().withMessage("Provide valid email"),
        body("phone")
            .optional()
            .isString()
            .withMessage("phone number should be string"),
    ]
};

const userUpdateValidator = () => {
    return [
        body("_id")
            .exists({checkFalsy: true})
            .withMessage("User ID is required")
            .isString()
            .withMessage("User ID should be string"),
        body("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        body("password")
            .exists()
            .withMessage("Password is required")
            .isString()
            .withMessage("Password should be string")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
        body("email").optional().isEmail().withMessage("Provide valid email"),
        body("phone")
            .optional()
            .isString()
            .withMessage("phone number should be string"),
    ]
};

const userDeleteValidator = () => {
    return [
        body("userId")
            .exists({checkFalsy: true})
            .withMessage("User ID is required")
            .isString()
            .withMessage("User ID should be string"),
    ]
};

module.exports = {
    userLoginValidator,
    userAddValidator,
    userUpdateValidator,
    userDeleteValidator
};