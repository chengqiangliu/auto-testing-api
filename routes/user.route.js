const router = require('express').Router();

const {
    userLoginValidator,
    userAddValidator,
    userUpdateValidator,
    userDeleteValidator,
    userDeleteByIdValidator
} = require("../validations/user.validation");

const {
    userLogin,
    userAdd,
    userUpdate,
    userDelete,
    userDeleteById,
    userList
} = require("../controllers/user.controller");
const logger = require('../lib/logger').API;

// login
router.post('/login', function(req, res, next) {
    let {username, password} = req.body;
    logger.info(`username: ${username}, password: ${password}`)
    return res.status(200).json({success: true, data: {id: "test"}});
});

// 添加用户
router.post('/add', userAddValidator, userAdd);

// 更新用户
router.post('/update', userUpdateValidator, userUpdate);

// 删除用户
router.post('/deleteByUser', userDeleteValidator, userDelete);
router.post('/deleteById', userDeleteByIdValidator, userDeleteById);

// 获取所有用户列表
router.post('/list', userList);

module.exports = router;
