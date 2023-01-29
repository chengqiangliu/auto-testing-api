const router = require('express').Router();

const {
    productAddValidator,
    productUpdateValidator,
    productUpdateStatusValidator,
    productDeleteValidator,
    productInfoValidator
} = require("../validations/product.validation");

const {
    productAdd,
    productUpdate,
    productDelete,
    getProductInfo, 
    getProductList,
    searchProduct
} = require("../controllers/product.controller");

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}

// 添加产品
router.post('/add', productAddValidator, productAdd);

// 更新产品
router.post('/update', productUpdateValidator, productUpdate);

// // 更新产品状态(上架/下架)
// router.post('/updateStatus', productUpdateStatusValidator, productUpdate);

// 删除产品
router.post('/delete', productDeleteValidator, productDelete);

// 获取产品信息
router.get('/info/:productId', productInfoValidator, getProductInfo);

// 获取所有产品列表
router.get('/list', getProductList);

// 搜索产品列表
// router.get('/search', searchProduct);

module.exports = router;