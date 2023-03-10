const router = require('express').Router();

const {
    errorsAddValidator,
    errorsUpdateValidator,
    errorsDeleteByIdValidator,
} = require("../validations/errors.validation");

const {
    errorsAdd,
    errorsUpdate,
    errorsDeleteById,
} = require("../controllers/errors.controller");

// errors add 
router.post('/add', errorsAddValidator, errorsAdd);

// errors update
router.post('/update', errorsUpdateValidator, errorsUpdate);


// errors delete by errors id
router.post('/deleteById', errorsDeleteByIdValidator, errorsDeleteById);


module.exports = router;