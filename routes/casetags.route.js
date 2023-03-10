const router = require('express').Router();

const {
    casetagsAddValidator,
    casetagsUpdateValidator,
    casetagsDeleteByIdValidator,
    casetagsInfoValidator
} = require("../validations/casetags.validation");

const {
    casetagsAdd,
    casetagsUpdate,
    casetagsDeleteById,
    casetagsGetInfo
} = require("../controllers/casetags.controller");

// casetags add 
router.post('/add', casetagsAddValidator, casetagsAdd);

// casetags update
router.post('/update', casetagsUpdateValidator, casetagsUpdate);

// casetags delete by case id
router.post('/deleteById', casetagsDeleteByIdValidator, casetagsDeleteById);

// case tags Information
router.get('/getInfo', casetagsInfoValidator, casetagsGetInfo);

module.exports = router;