const router = require('express').Router();

const {
    getAccessTokenValidator,
} = require("../validations/token.validation");

const {
    getAccessToken
} = require("../controllers/token.controller");

// 获得accessToken
router.post('/getAccessToken', getAccessTokenValidator, getAccessToken);
module.exports = router;