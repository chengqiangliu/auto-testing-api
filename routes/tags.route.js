const router = require('express').Router();

const {
    tagsAddValidator,
    tagsUpdateValidator,
    tagsDeleteValidator,
    tagsDeleteByIdValidator,
    tagsInfoValidator
} = require("../validations/tags.validation");

const {
    tagsAdd,
    tagsUpdate,
    tagsDelete,
    tagsDeleteById,
    tagsGet
} = require("../controllers/tags.controller");

// tags add 
router.post('/add', tagsAddValidator, tagsAdd);

// tags update
router.post('/update', tagsUpdateValidator, tagsUpdate);

// tags delete by tagsname
router.post('/deleteByName', tagsDeleteValidator, tagsDelete);

// tags delete by tags id
router.post('/deleteById', tagsDeleteByIdValidator, tagsDeleteById);

// tags Information
router.get('/get', tagsInfoValidator, tagsGet);

module.exports = router;

