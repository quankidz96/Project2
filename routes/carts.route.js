var express = require('express');
var router = express.Router();
var controller = require('../controllers/carts.controller')
//GET
router.get('/', controller.index);

router.get('/listcarts', controller.index);

router.get('/viewcart', controller.viewcart);

//POST

module.exports = router;