var express = require('express');
var router = express.Router();
var controller = require('../controllers/cate.controller');
var validate = require('../validate/cate.validate');

//GET
router.get('/', controller.listCates);

router.get('/listcates', controller.listCates);

router.get('/create-cate', controller.createCate);

router.get('/:id/update-cate', controller.updateCate);

router.get('/:id/delete-cate', controller.deleteCate);
//POST
router.post('/:id/update-cate', validate.checkError, controller.postUpdateCate);

router.post('/create-cate', validate.checkError, controller.postCreateCate);

module.exports = router; 