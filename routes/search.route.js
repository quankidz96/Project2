var express = require('express');
var router = express.Router();
var controller = require('../controllers/search.controller');
//var validate = require('../validate/cate.validate');

router.get('/', controller.search)

module.exports = router;