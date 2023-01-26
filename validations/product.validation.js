const { body, query } = require("express-validator");

const productAddValidator = () => {
    return [
        body("categoryId")
            .exists({checkFalsy: true})
            .withMessage("Category Id is required")
            .isString()
            .withMessage("Product name should be string"),
        body("pCategoryId")
            .exists({checkFalsy: true})
            .withMessage("pCategoryId is required")
            .isString()
            .withMessage("pCategoryId should be string"),
        body("name")
            .exists({checkFalsy: true})
            .withMessage("name is required")
            .isString()
            .withMessage("name should be string"),
        body("price")
            .exists({checkFalsy: true})
            .withMessage("price is required")
            .isNumeric()
            .withMessage("price should be Numeric"),
        body("desc")
            .optional()
            .isString()
            .withMessage("desc should be string"),
    ]
}

const productUpdateValidator =  () => {
    return [
        body("_id")
            .exists({checkFalsy: true})
            .withMessage("Product ID is required")
            .isString()
            .withMessage("Product ID should be string"),
        body("productName")
            .exists({checkFalsy: true})
            .withMessage("Product name is required")
            .isString()
            .withMessage("Product name should be string"),
    ]
}

const productDeleteValidator = () => {
    return [
        body("productId")
            .exists({checkFalsy: true})
            .withMessage("Product ID is required")
            .isString()
            .withMessage("Product ID should be string"),
    ]
};

const productInfoValidator = () => {
    return [
        query("productId")
            .exists({ checkFalsy: true })
            .withMessage("Product ID is required")
            .isString()
            .withMessage("Product ID should be string"),
    ]
};

module.exports = {
    productAddValidator,
    productUpdateValidator,
    productDeleteValidator,
    productInfoValidator
};