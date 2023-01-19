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

const filter = {password: 0, __v: 0}

router.post('/add', roleAddValidator, roleAdd);

router.post('/update', roleUpdateValidator, roleUpdate);

router.post('/delete', roleDeleteValidator, roleDelete);

router.post('/list', roleList);

module.exports = router;