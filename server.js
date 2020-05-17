// .ENV 
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cates = require('./routes/cate.route');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT;

// USE template engines PUG
app.set('view engine', 'pug');

// SET views to render
app.set('views', './views');

//static file
app.use(express.static('public'));

//body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json


// listen port
app.listen(port, function(){
    console.log('Server Starting on port: ' + port);
    
});
//site
app.get('/', function(req, res){
    res.render('site/main/home');
});

//admin
app.get('/admin',function (req, res) {
    res.render('admin/main/main')
});

app.use('/cates', cates);
