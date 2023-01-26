const router = require('express').Router();

const {
    userLoginValidator,
    userAddValidator,
    userUpdateValidator,
    userDeleteValidator
} = require("../validations/user.validation");

const {
    userLogin,
    userAdd,
    userUpdate,
    userDelete,
    userList
} = require("../controllers/user.controller");

// 登陆
router.post('/login', userLoginValidator, userLogin);

// 添加用户
router.post('/add', userAddValidator, userAdd);

// 更新用户
router.post('/update', userUpdateValidator, userUpdate);

// 删除用户
router.post('/delete', userDeleteValidator, userDelete);

// 获取所有用户列表
router.post('/list', userList);

module.exports = router;