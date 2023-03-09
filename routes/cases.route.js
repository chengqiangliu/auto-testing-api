const router = require('express').Router();

const {
    casesAddValidator,
    casesUpdateValidator,
    casesDeleteValidator,
    casesDeleteByIdValidator,
} = require("../validations/cases.validation");

const {
    casesAdd,
    casesUpdate,
    casesDelete,
    casesDeleteById,
    //tagsGetInfo
} = require("../controllers/cases.controller");

// apps add 
router.post('/add', casesAddValidator, casesAdd);

// apps update
router.post('/update', casesUpdateValidator, casesUpdate);

// apps delete by appsname
router.post('/deleteByName', casesDeleteValidator, casesDelete);

// apps delete by apps id
router.post('/deleteById', casesDeleteByIdValidator, casesDeleteById);



module.exports = router;