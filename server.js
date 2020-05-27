// .ENV 
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var cates = require('./routes/cate.route');
var carts = require('./routes/carts.route');
var manager = require('./routes/manager.route');
var products = require('./routes/products.route');
var index = require('./routes/index.route');



var app = express();
var port = process.env.PORT;
var UID = process.env.UID;

app.set('view engine', 'ejs');
app.set('views', './views');

//static file
app.use(express.static('public'));

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'something',
    resave: true,
    key: 'UID',
    saveUninitialized: true
}));
  app.use(passport.initialize());
  app.use(passport.session());
  
// listen port
app.listen(port, function(){
    console.log('Server Starting on port: ' + port);
});

function isAuthenticated(req, res, next ){

}

//login

//site
app.use('/', index);

//admin
app.use('/cates', cates);
app.use('/carts', carts);
app.use('/admin', manager);
app.use('/products', products);