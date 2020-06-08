// .ENV 
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


var cates = require('./routes/cates.route');
var orders = require('./routes/orders.route');
var manager = require('./routes/manager.route');
var products = require('./routes/products.route');
var index = require('./routes/index.route');
var search = require('./routes/search.route');

var auth = require('./middlewares/auth.middleware');

var app = express();
var port = process.env.PORT

app.set('view engine', 'ejs');
app.set('views', './views');

//static file
app.use(express.static('public'));

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'something',
  resave: false,
  key: 'UID',
  saveUninitialized: true,
}));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});
// listen port
app.listen(port, function(){
    console.log('Server Starting on port: ' + port);
});

//site
app.use('/', index);
app.use('/search', search);

//manager
app.use('/cates', auth.isAuthenticated, cates);
app.use('/orders', auth.isAuthenticated, orders);
app.use('/admin', manager);
app.use('/products', auth.isAuthenticated, products);
