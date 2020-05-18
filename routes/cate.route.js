var express = require('express');
var router = express.Router();
var controller = require('../controllers/cate.controller');
//GET
router.get('/', controller.index);

router.get('/cates/listcates',controller.goindex);

router.get('/listcates', controller.index);

router.get('/addcate', controller.addcate);

//POST
router.post('/addcate', function(req, res){
    console.log(res.body);
    res.redirect('/cates/addcate',)
})
module.exports = router;