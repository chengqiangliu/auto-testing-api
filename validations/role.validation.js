const { body } = require("express-validator");

const roleAddValidator = () => {
    return [
        body("roleName")
            .exists({checkFalsy: true})
            .withMessage("Role name is required")
            .isString()
            .withMessage("Role name should be string"),
    ]
};

const roleUpdateValidator = () => {
    return [
        body("_id")
            .exists({checkFalsy: true})
            .withMessage("Role ID is required")
            .isString()
            .withMessage("Role ID should be string"),
        body("roleName")
            .exists({checkFalsy: true})
            .withMessage("Role name is required")
            .isString()
            .withMessage("Role name should be string"),
    ]
}

const roleDeleteValidator = () => {
    return [
        body("roleId")
            .exists({checkFalsy: true})
            .withMessage("Role ID is required")
            .isString()
            .withMessage("Role ID should be string"),
    ]
}

module.exports = {
    roleAddValidator,
    roleUpdateValidator,
    roleDeleteValidator
};