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

// login
router.post('/login', userLoginValidator, userLogin);

// add user
router.post('/add', userAddValidator, userAdd);

// update user
router.post('/update', userUpdateValidator, userUpdate);

// delete user
router.post('/delete', userDeleteValidator, userDelete);

// get user list
router.post('/list', userList);

module.exports = router;