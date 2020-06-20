var express = require('express');
var router = express.Router();
var controller = require('../controllers/search.controller');
var validate = require('../validate/search.validate');

router.get('/',validate.checkError, controller.search)

module.exports = router;