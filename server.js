// .ENV 
require('dotenv').config();

var express = require('express');
var app = express();
var port = process.env.PORT;

// USE template engines PUG
app.set('view engine', 'pug');

// SET views to render
app.set('views', './views');

//static file
app.use(express.static('public'));

// listen port
app.listen(port, function(){
    console.log('Server Starting on port: ' + port);
    
});

app.get('/', function(req, res){
    res.render('site/home');
});

app.get('/admin',function(req, res){
    res.render('admin/login')
})