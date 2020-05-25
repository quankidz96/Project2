var express = require('express');
var router = express.Router();
var controller = require('../controllers/products.controller');

router.get('/', controller.index);

router.get('/addproduct', controller.create);






module.exports = router;