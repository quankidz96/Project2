var express = require('express');
var router = express.Router();
var controller = require('../controllers/orders.controller')
//GET
router.get('/', controller.index);

router.get('/listorders', controller.index);

router.get('/:id/view-order', controller.viewOrder);

router.get('/:id/del-order', controller.delOrder);

router.get('/:id/viewed', controller.viewed);
//POST
module.exports = router;