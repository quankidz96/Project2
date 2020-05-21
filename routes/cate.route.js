var express = require('express');
var router = express.Router();
var controller = require('../controllers/cate.controller');
//GET
router.get('/', controller.index);

router.get('/cates/listcates',controller.goIndex);

router.get('/listcates', controller.index);

router.get('/addcate', controller.create);

//POST
router.post('/addcate', controller.postCreate);
module.exports = router;