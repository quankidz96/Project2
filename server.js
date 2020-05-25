// .ENV 
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
//var firebase = require('firebase-admin');
var cates = require('./routes/cate.route');
var carts = require('./routes/carts.route');
var manager = require('./routes/manager.route');
var products = require('./routes/products.route');
//firebase
// var serviceAccount = require('./key/project2-c77c1-firebase-adminsdk-ccayy-afb5b5edc9.json')

// var firebaseAdmin = firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount),
//     databaseURL: 'https://project2-c77c1.firebaseio.com'
// });
// var db = firebase.database();


var app = express();
var port = process.env.PORT;

// USE template engines PUG
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
// SET views to render
app.set('views', './views');

//static file
app.use(express.static('public'));

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

// listen port
app.listen(port, function(){
    console.log('Server Starting on port: ' + port);
    
});

function isAuthenticated(req, res, next ){

}

//login


//site
app.get('/', function(req, res){
    res.render('site/main/home.ejs');
}); 

//admin

app.use('/cates', cates);
app.use('/carts', carts);
app.use('/admin', manager);
app.use('/products', products);