const router = require('express').Router();

const {
    deviceAddValidator,
    deviceUpdateValidator,
    deviceDeleteValidator,
    deviceGetValidator
} = require("../validations/device.validation");

const {
    deviceAdd,
    deviceUpdate,
    deviceDelete,
    deviceGet
} = require("../controllers/device.controller");
const logger = require('../lib/logger').API;

// login
/*router.post('/login', function(req, res, next) {
    let {username, password} = req.body;
    logger.info(`username: ${username}, password: ${password}`)
    return res.status(200).json({success: true, data: {id: "test"}});
});*/

// 添加用户
console.log('hiiii');
router.post('/add', deviceAddValidator, deviceAdd);
//console.log('hiiii');
// 更新用户
router.post('/update', deviceUpdateValidator, deviceUpdate);

// 删除用户
router.post('/delete', deviceDeleteValidator, deviceDelete);

router.post('/get', deviceGetValidator,deviceGet);

// 获取所有用户列表
//router.post('/list', userList);

module.exports = router;
