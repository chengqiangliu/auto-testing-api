const router = require('express').Router();

const {
    resultsAddValidator,
    resultsUpdateValidator,
    resultsDeleteByIdValidator,
    resultsInfoValidator
} = require("../validations/results.validation");

const {
    resultsAdd,
    resultsUpdate,
    resultsDeleteById,
    resultsGet
} = require("../controllers/results.controller");

// results add 
router.post('/add', resultsAddValidator, resultsAdd);

//results update
router.post('/update', resultsUpdateValidator, resultsUpdate);

// results delete by result id
router.post('/deleteById', resultsDeleteByIdValidator, resultsDeleteById);

// results get Information
router.get('/get', resultsInfoValidator, resultsGet);

module.exports = router;
