var express = require('express');
var router = express.Router();
var controller = require('../controllers/index.controller');
//var validate = require('../validate/index.validate');

router.get('/', controller.home);

router.get('/:name.:id', controller.showCate);

router.get('/detail/:name.:id.:idcate', controller.detail);

router.get('/addtocart/:id', controller.addToCart);

router.get('/cart', controller.cart);

router.post('/updateCart', controller.updateCart);

router.post('/delCart', controller.delCart);

router.get('/orderCart', controller.orderCart);

router.post('/orderCart',controller.postInfo);



module.exports = router;