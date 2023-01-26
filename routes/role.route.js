const router = require('express').Router();

const {
    roleAddValidator,
    roleUpdateValidator,
    roleDeleteValidator
} = require("../validations/role.validation");

const {
    roleAdd,
    roleUpdate,
    roleDelete,
    roleList
} = require("../controllers/role.controller");

// 指定需要过滤的属性
const filter = {password: 0, __v: 0}

// 添加角色
router.post('/add', roleAddValidator, roleAdd);

// 更新角色
router.post('/update', roleUpdateValidator, roleUpdate);

// 删除角色
router.post('/delete', roleDeleteValidator, roleDelete);

// 获取所有角色列表
router.post('/list', roleList);

module.exports = router;