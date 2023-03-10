const router = require('express').Router();

const {
    casesAddValidator,
    casesUpdateValidator,
    casesDeleteValidator,
    casesDeleteByIdValidator,
    casesInfoValidator
} = require("../validations/cases.validation");

const {
    casesAdd,
    casesUpdate,
    casesDelete,
    casesDeleteById,
    casesGet
} = require("../controllers/cases.controller");

// cases add 
router.post('/add', casesAddValidator, casesAdd);

// cases update
router.post('/update', casesUpdateValidator, casesUpdate);

// cases delete by casesname
router.post('/deleteByName', casesDeleteValidator, casesDelete);

// cases delete by cases id
router.post('/deleteById', casesDeleteByIdValidator, casesDeleteById);

// cases Information
router.get('/get', casesInfoValidator, casesGet);



module.exports = router;
