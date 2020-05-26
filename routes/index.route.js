var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.controller');
//var validate = require('../validate/index.validate');

router.get('/', controller.home);


module.exports = router;