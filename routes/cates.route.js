var express = require('express');
var router = express.Router();
var controller = require('../controllers/cate.controller');
var validate = require('../validate/cate.validate');

//GET
router.get('/', controller.index);

router.get('/cates/listcates', controller.goIndex);

router.get('/listcates', controller.index);

router.get('/addcate', controller.create);

router.get('/:id/fix-cate', controller.fixCate);

router.get('/:id/delete-cate', controller.deleteCate);
//POST
router.post('/:id/fix-cate', validate.checkError, controller.saveFix);

router.post('/addcate', validate.checkError, controller.postCreate);

module.exports = router; 