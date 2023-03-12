const router = require('express').Router();

const {
    configurationAddValidator,
    configurationUpdateValidator,
    configurationDeleteValidator,
    configurationDeleteByIdValidator,
    configurationInfoValidator
} = require("../validations/configuration.validation");

const {
    configurationAdd,
    configurationUpdate,
    configurationDelete,
    configurationDeleteById,
    configurationGetInfo
} = require("../controllers/configuration.controller");

// configuration add 
router.post('/add', configurationAddValidator, configurationAdd);

// ci update
router.post('/update', configurationUpdateValidator, configurationUpdate);

// ci delete by ci_url
router.post('/deleteByKey', configurationDeleteValidator, configurationDelete);

// apps delete by apps id
router.post('/deleteById', configurationDeleteByIdValidator, configurationDeleteById);

// apps Information
router.get('/getInfo', configurationInfoValidator, configurationGetInfo);

module.exports = router;