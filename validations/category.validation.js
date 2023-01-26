const { body, query } = require("express-validator");

const categoryAddValidator = () => {
    return [
        body("categoryName")
            .exists({checkFalsy: true})
            .withMessage("Category name is required")
            .isString()
            .withMessage("Category name should be string"),
        body("parentId")
            .optional()
            .isString()
            .withMessage("parentId should be string"),
    ]
}

const categoryUpdateValidator =  () => {
    return [
        body("categoryId")
            .exists({checkFalsy: true})
            .withMessage("Category ID is required")
            .isString()
            .withMessage("Category ID should be string"),
        body("categoryName")
            .exists({checkFalsy: true})
            .withMessage("Category name is required")
            .isString()
            .withMessage("Category name should be string"),
    ]
}

const categoryDeleteValidator = () => {
    return [
        body("categoryId")
            .exists({checkFalsy: true})
            .withMessage("Category ID is required")
            .isString()
            .withMessage("Category ID should be string"),
    ]
};

const categoryInfoValidator = () => {
    return [
        query("categoryId")
            .exists({ checkFalsy: true })
            .withMessage("Category ID is required")
            .isString()
            .withMessage("Category ID should be string"),
    ]
};

module.exports = {
    categoryAddValidator,
    categoryUpdateValidator,
    categoryDeleteValidator,
    categoryInfoValidator
};