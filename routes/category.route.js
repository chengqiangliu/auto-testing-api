const router = require('express').Router();

const {
    categoryAddValidator,
    categoryUpdateValidator,
    categoryDeleteValidator,
    categoryInfoValidator
} = require("../validations/category.validation");

const {
    categoryAdd,
    categoryUpdate,
    categoryDelete,
    getCategoryInfo, 
    getCategoryList
} = require("../controllers/category.controller");

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}

// 添加分类
router.post('/add', categoryAddValidator, categoryAdd);

// 更新分类
router.post('/update', categoryUpdateValidator, categoryUpdate);

// 删除分类
router.post('/delete', categoryDeleteValidator, categoryDelete);

// 获取所有分类信息
router.get('/info/:categoryId', categoryInfoValidator, getCategoryInfo);

// 获取所有分类列表
router.get('/list', getCategoryList);

module.exports = router;