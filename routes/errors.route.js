const router = require('express').Router();

const {
    errorsAddValidator,
    errorsUpdateValidator,
    errorsDeleteByIdValidator,
    errorsInfoValidator
} = require("../validations/errors.validation");

const {
    errorsAdd,
    errorsUpdate,
    errorsDeleteById,
    errorsGet
} = require("../controllers/errors.controller");

// errors add 
router.post('/add', errorsAddValidator, errorsAdd);

// errors update
router.post('/update', errorsUpdateValidator, errorsUpdate);


// errors delete by errors id
router.post('/deleteById', errorsDeleteByIdValidator, errorsDeleteById);

//errors get by errors id 
router.post('/get',errorsInfoValidator,errorsGet);

module.exports = router;
