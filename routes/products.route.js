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

router.get('/', controller.listProd);

router.get('/listproducts', controller.listProd);

router.get('/addproduct', controller.createProd);

router.get('/:id/delete-product', controller.deleteProd);

router.get('/:id/fix-product', controller.updateProd);
//POST
router.post('/addproduct', 
    upload.single('avatar'),
    validate.checkErrorCreate, 
    controller.postCreateProd
);

router.post('/:id/fix-product',
    upload.single('avatar'),
    validate.checkErrorUpdate,
    controller.postUpdateProd
);


module.exports = router;