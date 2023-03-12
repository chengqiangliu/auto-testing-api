const router = require('express').Router();

const {
    ciAddValidator,
    ciUpdateValidator,
    ciDeleteValidator,
    ciDeleteByIdValidator,
    ciInfoValidator
} = require("../validations/ci.validation");

const {
    ciAdd,
    ciUpdate,
    ciDelete,
    ciDeleteById,
    ciGetInfo
} = require("../controllers/ci.controller");

// ci add 
router.post('/add', ciAddValidator, ciAdd);

// ci update
router.post('/update', ciUpdateValidator, ciUpdate);

// ci delete by ci_url
router.post('/deleteByUrl', ciDeleteValidator, ciDelete);

// apps delete by apps id
router.post('/deleteById', ciDeleteByIdValidator, ciDeleteById);

// apps Information
router.get('/getInfo', ciInfoValidator, ciGetInfo);

module.exports = router;