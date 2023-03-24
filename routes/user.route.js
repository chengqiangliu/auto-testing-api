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

const { expressjwt } = require('express-jwt');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');
//const logger = require('../lib/logger').API;

const generateToken = (payload, type) => {
    logger.info('The generateToken started');
    if (type === 'AccessToken') {
        return jwt.sign(payload, secret, {expiresIn: "600s"});
    } else {
        return jwt.sign(payload, secret, {expiresIn: "24h"});
    }
}


router.post('/login',userLoginValidator,userLogin);


router.post('/add', userAddValidator, userAdd);


 
router.post('/update', userUpdateValidator, userUpdate);


router.post('/delete', userDeleteValidator, userDelete);


router.post('/deleteById', userDeleteByIdValidator, userDeleteById);


router.get('/list', userList);

module.exports = router;
