var express = require('express');
var router = express.Router();
var controller = require('../controllers/products.controller');
var validate = require('../validate/product.validate');
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname);
    }
  });
var upload = multer({ storage: storage });

router.get('/', controller.index);

router.get('/products/listproducts',controller.goIndex);

router.get('/addproduct', controller.create);

router.get('/listproducts', controller.index);

router.get('/:id/delete-product', controller.delete);

router.get('/:id/fix-product', controller.fix);
//POST
router.post('/addproduct', 
    upload.single('avatar'),
    validate.checkError, 
    controller.postCreate
);

router.post('/:id/fix-product',
    upload.single('avatar'),
    validate.checkError,
    controller.saveFix
);


module.exports = router;