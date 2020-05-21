var express = require('express');
var router = express.Router();
var controller = require('../controllers/manager.controller');

router.get('/login', controller.login);
router.get('/' , controller.admin)

module.exports = router;