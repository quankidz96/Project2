var express = require('express');
var router = express.Router();
var controller = require('../controllers/manager.controller');
var auth = require('../middlewares/auth.middleware');

router.get('/login', controller.login);

router.get('/', auth.isAuthenticated , controller.admin)

router.get('/logout', auth.isAuthenticated, controller.logout)

router.post('/login', controller.authenticate);


module.exports = router;