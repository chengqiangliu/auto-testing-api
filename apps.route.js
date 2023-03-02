const router = require('express').Router();

const {
    appsAddValidator,
    appsUpdateValidator,
    appsDeleteValidator,
    appsDeleteByIdValidator,
    appsInfoValidator
} = require("../validations/apps.validation");

const {
    appsAdd,
    appsUpdate,
    appsDelete,
    appsDeleteById,
    appsGetInfo
} = require("../controllers/apps.controller");

// apps add 
router.post('/add', appsAddValidator, appsAdd);

// apps update
router.post('/update', appsUpdateValidator, appsUpdate);

// apps delete by appsname
router.post('/deleteByName', appsDeleteValidator, appsDelete);

// apps delete by apps id
router.post('/deleteById', appsDeleteByIdValidator, appsDeleteById);

// apps Information
router.get('/getInfo', appsInfoValidator, appsGetInfo);

module.exports = router;